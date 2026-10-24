import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ContributionCache } from '../src/lib/contribution-cache';
import { handleContributionRequest } from '../src/lib/contribution-proxy';

function createCache(): ContributionCache {
	return {
		get: vi.fn().mockResolvedValue(null),
		set: vi.fn().mockResolvedValue(undefined),
	};
}

function createRequest(origin?: string): Request {
	return new Request('https://app.example/api/contributions/octocat', {
		headers: origin ? { Origin: origin } : undefined,
	});
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe('handleContributionRequest', () => {
	it.each(['-octocat', 'octocat-', 'two--hyphens', 'a'.repeat(40)])(
		'rejects invalid username %s before contacting upstream',
		async (username) => {
			const cache = createCache();
			const fetcher = vi.fn<typeof fetch>();

			const response = await handleContributionRequest({
				request: createRequest(),
				username,
				cache,
				fetcher,
			});

			expect(response.status).toBe(400);
			expect(await response.json()).toMatchObject({ error: { code: 'INVALID_USERNAME' } });
			expect(cache.get).not.toHaveBeenCalled();
			expect(fetcher).not.toHaveBeenCalled();
		},
	);

	it('rejects a different browser origin without CORS access', async () => {
		const cache = createCache();
		const fetcher = vi.fn<typeof fetch>();

		const response = await handleContributionRequest({
			request: createRequest('https://other.example'),
			username: 'octocat',
			cache,
			fetcher,
		});

		expect(response.status).toBe(403);
		expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
		expect(cache.get).not.toHaveBeenCalled();
		expect(fetcher).not.toHaveBeenCalled();
	});

	it('serves cached JSON without contacting upstream', async () => {
		const payload = { total: 12 };
		const cache = createCache();
		vi.mocked(cache.get).mockResolvedValue(JSON.stringify(payload));
		const fetcher = vi.fn<typeof fetch>();

		const response = await handleContributionRequest({
			request: createRequest('https://app.example'),
			username: 'Octocat',
			cache,
			fetcher,
		});

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(payload);
		expect(fetcher).not.toHaveBeenCalled();
		expect(cache.get).toHaveBeenCalledWith('contributions:v1:octocat');
	});

	it('fetches over HTTPS and stores successful JSON for five minutes', async () => {
		const payload = { total: 42 };
		const cache = createCache();
		const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json(payload));

		const response = await handleContributionRequest({
			request: createRequest(),
			username: 'octocat',
			cache,
			fetcher,
		});

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(payload);
		expect(fetcher).toHaveBeenCalledWith(
			'https://github.com/octocat.contribs',
			expect.objectContaining({ headers: { Accept: 'application/json' } }),
		);
		expect(cache.set).toHaveBeenCalledWith(
			'contributions:v1:octocat',
			JSON.stringify(payload),
			300,
		);
	});

	it('fetches without caching when the shared cache is unavailable', async () => {
		const cache = createCache();
		vi.mocked(cache.get).mockRejectedValue(new Error('Redis unavailable'));
		const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ total: 1 }));
		vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		const response = await handleContributionRequest({
			request: createRequest(),
			username: 'octocat',
			cache,
			fetcher,
		});

		expect(response.status).toBe(200);
		expect(cache.set).not.toHaveBeenCalled();
	});

	it('returns successful data when writing to the shared cache fails', async () => {
		const cache = createCache();
		vi.mocked(cache.set).mockRejectedValue(new Error('Redis unavailable'));
		const payload = { total: 5 };
		const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json(payload));
		vi.spyOn(console, 'error').mockImplementation(() => undefined);

		const response = await handleContributionRequest({
			request: createRequest(),
			username: 'octocat',
			cache,
			fetcher,
		});

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(payload);
	});

	it.each([
		{ upstreamStatus: 404, expectedStatus: 404, code: 'USER_NOT_FOUND' },
		{ upstreamStatus: 503, expectedStatus: 502, code: 'UPSTREAM_ERROR' },
	])('maps upstream status $upstreamStatus to $expectedStatus', async ({ upstreamStatus, expectedStatus, code }) => {
		const cache = createCache();
		const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: upstreamStatus }));
		vi.spyOn(console, 'error').mockImplementation(() => undefined);

		const response = await handleContributionRequest({
			request: createRequest(),
			username: 'octocat',
			cache,
			fetcher,
		});

		expect(response.status).toBe(expectedStatus);
		expect(await response.json()).toMatchObject({ error: { code } });
		expect(cache.set).not.toHaveBeenCalled();
	});

	it('returns a specific error for invalid upstream JSON', async () => {
		const cache = createCache();
		const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('not json'));
		vi.spyOn(console, 'error').mockImplementation(() => undefined);

		const response = await handleContributionRequest({
			request: createRequest(),
			username: 'octocat',
			cache,
			fetcher,
		});

		expect(response.status).toBe(502);
		expect(await response.json()).toMatchObject({ error: { code: 'INVALID_UPSTREAM_RESPONSE' } });
	});

	it('returns 502 when the upstream request fails', async () => {
		const cache = createCache();
		const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new Error('Network unavailable'));
		vi.spyOn(console, 'error').mockImplementation(() => undefined);

		const response = await handleContributionRequest({
			request: createRequest(),
			username: 'octocat',
			cache,
			fetcher,
		});

		expect(response.status).toBe(502);
		expect(await response.json()).toMatchObject({ error: { code: 'UPSTREAM_UNAVAILABLE' } });
	});

	it('returns 504 when the upstream request exceeds its timeout', async () => {
		const cache = createCache();
		const fetcher: typeof fetch = async (_input, init) => new Promise<Response>((_resolve, reject) => {
			init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
		});

		const response = await handleContributionRequest({
			request: createRequest(),
			username: 'octocat',
			cache,
			fetcher,
			timeoutMs: 5,
		});

		expect(response.status).toBe(504);
		expect(await response.json()).toMatchObject({ error: { code: 'UPSTREAM_TIMEOUT' } });
	});

	it('keeps the timeout active while reading the upstream body', async () => {
		const cache = createCache();
		const fetcher: typeof fetch = async (_input, init) => {
			const body = new ReadableStream<Uint8Array>({
				start(controller) {
					init?.signal?.addEventListener(
						'abort',
						() => controller.error(new DOMException('Aborted', 'AbortError')),
						{ once: true },
					);
				},
			});
			return new Response(body);
		};

		const response = await handleContributionRequest({
			request: createRequest(),
			username: 'octocat',
			cache,
			fetcher,
			timeoutMs: 5,
		});

		expect(response.status).toBe(504);
		expect(await response.json()).toMatchObject({ error: { code: 'UPSTREAM_TIMEOUT' } });
	});
});

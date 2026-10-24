import type { ContributionCache } from './contribution-cache';

const CACHE_TTL_SECONDS = 300;
const CACHE_KEY_PREFIX = 'contributions:v1:';
const UPSTREAM_TIMEOUT_MS = 8_000;

interface ProxyRequestOptions {
	request: Request;
	username: string | undefined;
	cache: ContributionCache;
	fetcher?: typeof fetch;
	timeoutMs?: number;
}

function jsonResponse(data: unknown, status = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Cache-Control': 'no-store',
			'Content-Type': 'application/json; charset=utf-8',
			Vary: 'Origin',
		},
	});
}

function errorResponse(status: number, code: string, message: string): Response {
	return jsonResponse({ error: { code, message } }, status);
}

function isValidUsername(username: string | undefined): username is string {
	return typeof username === 'string'
		&& username.length <= 39
		&& /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(username);
}

function isSameOrigin(request: Request): boolean {
	const origin = request.headers.get('origin');
	if (!origin) return true;

	try {
		return new URL(origin).origin === new URL(request.url).origin;
	} catch {
		return false;
	}
}

export async function handleContributionRequest({
	request,
	username,
	cache,
	fetcher = fetch,
	timeoutMs = UPSTREAM_TIMEOUT_MS,
}: ProxyRequestOptions): Promise<Response> {
	if (!isSameOrigin(request)) {
		return errorResponse(403, 'ORIGIN_NOT_ALLOWED', 'Only same-origin requests are allowed.');
	}

	if (!isValidUsername(username)) {
		return errorResponse(400, 'INVALID_USERNAME', 'Provide a valid GitHub username.');
	}

	const cacheKey = `${CACHE_KEY_PREFIX}${username.toLowerCase()}`;
	let cacheAvailable = true;

	try {
		const cached = await cache.get(cacheKey);
		if (cached !== null) {
			try {
				return jsonResponse(JSON.parse(cached));
			} catch (error) {
				console.warn('Ignoring invalid JSON in contribution cache entry', error);
			}
		}
	} catch (error) {
		cacheAvailable = false;
		console.warn('Contribution cache unavailable; fetching without cache', error);
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);
	let upstream: Response;
	let data: unknown;

	try {
		upstream = await fetcher(`https://github.com/${encodeURIComponent(username)}.contribs`, {
			headers: { Accept: 'application/json' },
			signal: controller.signal,
		});
		if (upstream.ok && upstream.status !== 404) {
			try {
				data = await upstream.json();
			} catch (error) {
				if (controller.signal.aborted) throw error;
				console.error('Contribution upstream returned invalid JSON', error);
				return errorResponse(502, 'INVALID_UPSTREAM_RESPONSE', 'GitHub returned invalid contribution data.');
			}
		}
	} catch (error) {
		if (controller.signal.aborted) {
			return errorResponse(504, 'UPSTREAM_TIMEOUT', 'GitHub did not respond in time.');
		}

		console.error('Contribution upstream request failed', error);
		return errorResponse(502, 'UPSTREAM_UNAVAILABLE', 'Contribution data is temporarily unavailable.');
	} finally {
		clearTimeout(timeout);
	}

	if (upstream.status === 404) {
		return errorResponse(404, 'USER_NOT_FOUND', 'No contribution data was found for that username.');
	}

	if (!upstream.ok) {
		console.error('Contribution upstream returned an unsuccessful status', upstream.status);
		return errorResponse(502, 'UPSTREAM_ERROR', 'Contribution data is temporarily unavailable.');
	}

	if (data === undefined) {
		return errorResponse(502, 'INVALID_UPSTREAM_RESPONSE', 'GitHub returned invalid contribution data.');
	}

	const serialized = JSON.stringify(data);
	if (cacheAvailable) {
		try {
			if (serialized !== undefined) {
				await cache.set(cacheKey, serialized, CACHE_TTL_SECONDS);
			}
		} catch (error) {
			console.error('Could not store contribution response in cache', error);
		}
	}

	return jsonResponse(data);
}

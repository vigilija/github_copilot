import type { APIRoute } from 'astro';
import { contributionCache } from '../../../lib/contribution-cache';
import { handleContributionRequest } from '../../../lib/contribution-proxy';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
	return handleContributionRequest({
		request,
		username: params.username,
		cache: contributionCache,
	});
};

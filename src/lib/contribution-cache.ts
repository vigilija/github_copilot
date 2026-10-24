import { createClient } from 'redis';

export interface ContributionCache {
	get(_key: string): Promise<string | null>;
	set(_key: string, _value: string, _ttlSeconds: number): Promise<void>;
}

let client: ReturnType<typeof createClient> | undefined;
let connectionPromise: Promise<void> | undefined;

async function getReadyClient() {
	const url = process.env.REDIS_URL;
	if (!url) {
		throw new Error('REDIS_URL is not configured');
	}

	if (!client) {
		client = createClient({
			url,
			socket: {
				connectTimeout: 1_000,
				reconnectStrategy: false,
			},
		});
		client.on('error', (error) => {
			console.error('Contribution cache Redis client error', error);
		});
	}

	if (!client.isReady) {
		if (!client.isOpen) {
			connectionPromise ??= client.connect()
				.then(() => undefined)
				.finally(() => {
					connectionPromise = undefined;
				});
		}
		if (connectionPromise) await connectionPromise;
		if (!client.isReady) throw new Error('Redis client is not ready');
	}

	return client;
}

export const contributionCache: ContributionCache = {
	async get(key) {
		const redis = await getReadyClient();
		return redis.get(key);
	},
	async set(key, value, ttlSeconds) {
		const redis = await getReadyClient();
		await redis.setEx(key, ttlSeconds, value);
	},
};

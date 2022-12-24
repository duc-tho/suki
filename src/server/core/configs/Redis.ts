import { createClient, RedisClientType } from 'redis';

class RedisCache {
    execute = async (handleFunction: Function) => {
        const client = createClient(process.env.REDIS_URL ? { url: process.env.REDIS_URL } : {});
        await client.connect();

        const result = await handleFunction(client);

        await client.disconnect();
        return result;
    }

    setCache = async (key: string, value: string) => {
        return await this.execute(async (client: RedisClientType) => {
            return await client.set(key, value);
        })
    }

    getCache = async (key: string) => {
        return await this.execute(async (client: RedisClientType) => {
            return await client.get(key);
        })
    }
}

export default new RedisCache();

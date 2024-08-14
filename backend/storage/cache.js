import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor () {
        this.client = createClient();
        this.client.on('error',  (error) => {
            console.error('Redis Client Error: ', error);
        });

        this.connected = false;

        this.client.connect().catch(error => {
            console.error('Redis connection failed:', error);
        });

        this.client.on('ready',  () => {
            this.connected = true;
            console.log('Cache is online');
        });

        this.getAsync = promisify(this.client.get).bind(this.client);

        this.setAsync = promisify(this.client.set).bind(this.client);
    
        this.delAsync = promisify(this.client.del).bind(this.client);
    }

    isConnected () {
        return this.connected;
    }

    async get(key) {
        const value = await this.getAsync(key);
        return value;
    }
    
    async set(key, value, timeout) {
        await this.setAsync(key, value, 'EX', timeout);
    }
    
    async del(key) {
        await this.delAsync(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;

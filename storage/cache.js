import { createClient } from 'redis';

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
    }

    isConnected () {
        return this.connected;
    }

    async get () {
    }

    async set () {
    }
}

const redisClient = new RedisClient();
export default redisClient;

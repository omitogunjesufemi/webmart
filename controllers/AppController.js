import redisClient from "../storage/cache";
import dbClient from "../storage/db";

class AppController {
    static getStatus(request, response) {
        const dbState = dbClient.isConnected();
        const cacheState = redisClient.isConnected();

        response.status(200).json({
            cache: cacheState,
            db: dbState,
        });
    }

    static getStats(request, response) {
        const userCount = dbClient.nbUsers();

        response.status(200).json({
            users: userCount,
        });
    }
}

export default AppController;
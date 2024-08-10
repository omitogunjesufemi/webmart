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

    static async getStats(request, response) {
        const userCount = await dbClient.nbUsers();
        const productCount = await dbClient.nbProducts();

        response.status(200).json({
            users: userCount,
            products: productCount,
        });
    }
}

export default AppController;
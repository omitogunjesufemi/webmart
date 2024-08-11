import { MongoClient } from "mongodb";

class DBClient {
    constructor () {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'web_mart';

        const url = `mongodb://${host}:${port}`;

        this.client = new MongoClient(url);

        this.connected = false;

        try {
            this.client.connect();
            this.connected = true;
            console.log('DB connected successfully');
        } catch (error) {
            console.error('DB Connection failed: ', error);
        }

        this.db = this.client.db(database);
    }

    isConnected () {
        return this.connected;
    }

    async nbUsers() {
        const noOfUsers = await this.db.collection('users').countDocuments();
        return noOfUsers;
    }

    async nbProducts() {
        const noOfProducts = await this.db.collection('products').countDocuments();
        return noOfProducts;
    }

    async nbOrders() {
        const noOfOrders = await this.db.collection('orders').countDocuments();
        return noOfOrders;
    }

    async nbCategories() {
        const noOfCategories = await this.db.collection('categories').countDocuments();
        return noOfCategories;
    }

}

const dbClient = new DBClient();
export default dbClient;
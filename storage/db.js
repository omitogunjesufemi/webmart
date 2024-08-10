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

}

const dbClient = new DBClient();
export default dbClient;
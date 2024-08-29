import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import dbClient from '../storage/db';

class UserService {
    static userCollection = dbClient.db.collection('users');

    static async getAllUsers() {
        try {
            const allUsers = await this.userCollection.find({}).toArray();
            return allUsers;
        } catch (error) {
            return ({'error': `Failed to get users: ${error}`});
        }
    }

    static async getUserByID(userID) {
        try {
            const user = await this.userCollection.findOne({_id: new ObjectId(userID)});
            return user;
        } catch (error) {
            return ({'error': `Failed to get user: ${error}`});
        }
    }

    static async getUserByEmail(userEmail) {
        try {
            const user = await this.userCollection.findOne({ email: userEmail });
            return user;
        } catch (error) {
            return ({'error': `Failed to get user: ${error}`});
        }
    }

    static async createUser(userObj) {
        if (!userObj.firstName) {
            return ({'error': 'Missing user first name'});
        }

        if (!userObj.lastName) {
            return ({'error': 'Missing user last name'});
        }

        if (!userObj.email) {
            return ({'error': 'Missing user email'});
        }

        if (!userObj.password) {
            return ({'error': 'Missing user password'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(userObj.password.trim(), salt);

        const date = new Date();

        const user = {
            firstName: userObj.firstName.trim(),
            lastName: userObj.lastName.trim(),
            email: userObj.email.trim(),
            telephone: userObj.telephone.trim() || '',
            billingAddress: userObj.billingAddress || '',
            isAdmin: userObj.isAdmin || false,
            isMerch: userObj.isMerch || false,
            isBuyer: userObj.isBuyer || true,
            password: hashPwd,
            createdAt: date,
            updatedAt: date
        };

        try {
            const newUser = await this.userCollection.insertOne(user);
            return newUser.insertedId;
        } catch (error) {
            return ({'error': `Failed to create user: ${error}`});
        }
    }

    static async createManyUsers(listOfUserObj) {
        if (Object.entries(listOfUserObj).length <= 0) {
            return ({'error': 'List of users can\'t be empty'});
        }

        try {
            const newUsers = await this.userCollection.insertMany(listOfUserObj);
            return newUsers;   
        } catch (error) {
            return ({'error': `Failed to create users: ${error}`});
        }
    }

    static async updateUserByID(userID, updatedObj) {
        try {
            const userObj = this.getUserByID(userID);
            const updatedUser = await this.userCollection.updateOne(userObj, updatedObj);
            return updatedUser;
        } catch (error) {
            return ({'error': `Failed to update user: ${error}`});
        }
    }

    static async updateUserByEmail(userEmail, updatedObj) {
        try {
            const userObj = this.getUserByEmail(userEmail);
            const updatedUser = await this.userCollection.updateOne(userObj, updatedObj);
            return updatedUser;
        } catch (error) {
            return ({'error': `Failed to update user: ${error}`});
        }
    }

    static async updateUser(userObj, updatedObj) {
        try {
            const updatedUser = await this.userCollection.updateOne(userObj, updatedObj);
            return updatedUser;   
        } catch (error) {
            return ({'error': `Failed to update user: ${error}`});
        }
    }

    static async deleteUserByID(userID) {
        try {
            const user = this.getUserByID(userID);
            const deleted = await this.userCollection.deleteOne(user);
            return deleted.acknowledged;
        } catch (error) {
            return ({'error': `Failed to delete user: ${error}`});
        }
    }

    static async deleteUserByEmail(userEmail) {
        try {
            const user = this.getUserByEmail(userEmail);
            const deleted = await this.userCollection.deleteOne(user);
            return deleted.acknowledged;
        } catch (error) {
            return ({'error': `Failed to delete user: ${error}`});
        }
    }
}

export default UserService;

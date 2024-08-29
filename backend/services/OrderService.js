import { ObjectId } from 'mongodb';
import dbClient from '../storage/db';

class OrderService {
    static orderCollection = dbClient.db.collection('orders');

    static async getAllOrders() {
        try {
            const allOrders = await this.orderCollection.find({}).toArray();
            return allOrders;
        } catch (error) {
            return ({'error': `Failed to get orders: ${error}`});
        }
    }

    static async getOrderByID(orderID) {
        try {
            const order = await this.orderCollection.findOne({_id: new ObjectId(orderID)});
            return order;
        } catch (error) {
            return ({'error': `Failed to get order: ${error}`});
        }
    }

    static async getAllOrderByUserID(userID) {
        try {
            const orderList = await this.orderCollection.find({ userID: new ObjectId(userID) }).toArray();
            return orderList;
        } catch (error) {
            return ({'error': `Failed to get order: ${error}`});
        }
    }

    static async createOrder(orderObj) {
        if (!orderObj.userEmail) {
            return ({'error': 'Missing user for order'});
        }

        if (!orderObj.billingInfo) {
            return ({'error': 'Missing order billing information'});
        }

        if (!orderObj.cartItems) {
            return ({'error': 'Missing order items'});
        }

        const date = new Date();

        const order = {
            userEmail: orderObj.userEmail,
            billingInfo: orderObj.billingInfo,
            cartItems: orderObj.cartItems,
            totalPrice: orderObj.totalPrice,
            totalQuant: orderObj.totalQuant,
            isDelivered: false,
            createdAt: date,
            updatedAt: date
        };

        try {
            const newOrder = await this.orderCollection.insertOne(order);
            return newOrder.insertedId;
        } catch (error) {
            return ({'error': `Failed to create order: ${error}`});
        }
    }

    static async createManyOrders(listOfOrderObj) {
        if (Object.entries(listOfOrderObj).length <= 0) {
            return ({'error': 'List of orders can\'t be empty'});
        }

        try {
            const newOrders = await this.orderCollection.insertMany(listOfOrderObj);
            return newOrders;   
        } catch (error) {
            return ({'error': `Failed to create orders: ${error}`});
        }
    }

    static async updateOrderByID(orderID, updatedObj) {
        try {
            const orderObj = this.getOrderByID(orderID);
            const updatedOrder = await this.orderCollection.updateOne(orderObj, updatedObj);
            return updatedOrder;
        } catch (error) {
            return ({'error': `Failed to update order: ${error}`});
        }
    }

    static async updateOrder(orderObj, updatedObj) {
        try {
            const updatedOrder = await this.orderCollection.updateOne(orderObj, updatedObj);
            return updatedOrder;   
        } catch (error) {
            return ({'error': `Failed to update order: ${error}`});
        }
    }

    static async deleteOrderByID(orderID) {
        try {
            const order = this.getOrderByID(orderID);
            const deleted = await this.orderCollection.deleteOne(order);
            return deleted.acknowledged;
        } catch (error) {
            return ({'error': `Failed to delete order: ${error}`});
        }
    }
}

export default OrderService;
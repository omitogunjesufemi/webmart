import { ObjectId } from 'mongodb';
import dbClient from '../storage/db';
import ProductService from './ProductService';

class CartService {
    static cartCollection = dbClient.db.collection('carts');

    static async getAllCarts() {
        try {
            const allCarts = await this.cartCollection.find({}).toArray();
            return allCarts;
        } catch (error) {
            return null;
        }
    }

    static async getCartByID(cartID) {
        try {
            const cart = await this.cartCollection.findOne({_id: new ObjectId(cartID)});
            return cart;
        } catch (error) {
            return null;
        }
    }

    static async getCartByUserID(userID) {
        try {
            const cart = await this.cartCollection.findOne({_id: new ObjectId(userID)});
            return cart;
        } catch (error) {
            return null;
        }
    }

    static async createCart(cartObj) {
        if (Object.entries(cartObj).length < 4) {
            return ({'error': 'Cart properties are missing!!!'});
        }

        if (!cartObj.productList) {
            return ({'error': 'Cart product list is missing'});
        }

        for (let i = 0; i < cartObj.productList.length; i++) {
            const element = cartObj.productList[i];
            if (!ProductService.getProductByID(element)) {
                cartObj.productList.splice(i, 1);
            }
        }

        if (cartObj.productList.length <= 0) {
            return ({'error': 'Cart product list is empty'});
        }

        const date = new Date();

        const cart = {
            userID: cartObj.userID,
            productList: cartObj.productList,
            totalQuant: cartObj.totalQuant,
            totalPrice: cartObj.totalPrice,
            createdAt: date,
            updatedAt: date
        };

        try {
            const newCart = await this.cartCollection.insertOne(cart);

            const productList = cart.productList;

            for (const productID of productList) {
                const updateObj = {$inc: {stock: -1}};
                ProductService.updateProductByID(productID, updateObj);
            }

            return newCart.insertedId;
        } catch (error) {
            return ({'error': `Failed to create cart: ${error}`});
        }
    }

    static async updateCartByID(cartID, updatedObj) {
        try {
            const cartObj = this.getCartByID(cartID);
            const updatedCart = await this.cartCollection.updateOne(cartObj, updatedObj);
            return updatedCart;
        } catch (error) {
            return ({'error': `Failed to update cart: ${error}`});
        }
    }

    static async updateCart(cartObj, updatedObj) {
        try {
            const updatedCart = await this.cartCollection.updateOne(cartObj, updatedObj);
            return updatedCart;   
        } catch (error) {
            return ({'error': `Failed to update cart: ${error}`});
        }
    }

    static async deleteCartByID(cartID) {
        try {
            const cart = this.getCartByID(cartID);
            
            const productList = cart.productList;

            const deleted = await this.cartCollection.deleteOne(cart);

            for (const productID of productList) {
                const updateObj = {$inc: {stock: +1}};
                ProductService.updateProductByID(productID, updateObj);
            }

            return deleted.acknowledged;
        } catch (error) {
            return ({'error': `Failed to delete cart: ${error}`});
        }
    }
}

export default CartService;
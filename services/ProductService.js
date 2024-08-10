import { ObjectId } from 'mongodb';
import dbClient from '../storage/db';

class ProductService {
    static productCollection = dbClient.db.collection('products');

    static async getAllProducts() {
        const allProducts = await this.productCollection.find({}).toArray();
        return allProducts;
    }

    static async getProductByID(productID) {
        const product = await this.productCollection.findOne({_id: new ObjectId(productID)});
        return product;
    }

    static async createProduct(productObj) {
        if (!productObj.name) {
            return ({'error': 'Missing product name'});
        }

        if (!productObj.price) {
            return ({'error': 'Missing product price'});
        }

        if (!productObj.stock) {
            return ({'error': 'Missing product available quantity'});
        }

        try {
            const newProduct = await this.productCollection.insertOne(productObj);
            return newProduct;   
        } catch (error) {
            return ({'error': `Failed to create product: ${error}`});
        }
    }

    static async createManyProducts(listOfProductObj) {
        const newProducts = await this.productCollection.insertMany(listOfProductObj);
        return newProducts;
    }

    static async updateProductByID(productID, updatedObj) {
        try {
            const productObj = this.getProduct(productID);
            const updatedProduct = await this.productCollection.updateOne(productObj, updatedObj);
            return updatedProduct;
        } catch (error) {
            return ({'error': `Failed to update product: ${error}`});
        }
    }

    static async updateProduct(productObj, updatedObj) {
        const updatedProduct = await this.productCollection.updateOne(productObj, updatedObj);
        return updatedProduct;
    }

    static async deleteProductByID(productID) {
        const product = this.getProduct(productID);
        await this.productCollection.deleteOne(product);
    }

    static async deleteManyProduct(listOfProductIDs) {
    }

}

export default ProductService;
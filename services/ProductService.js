import { ObjectId } from 'mongodb';
import dbClient from '../storage/db';

class ProductService {
    static productCollection = dbClient.db.collection('products');

    static async getAllProducts() {
        try {
            const allProducts = await this.productCollection.find({}).toArray();
            return allProducts;  
        } catch (error) {
            return ({'error': `Failed to get products: ${error}`});
        }
    }

    static async getProductByID(productID) {
        try {
            const product = await this.productCollection.findOne({_id: new ObjectId(productID)});
            return product;
        } catch (error) {
            return ({'error': `Failed to get product: ${error}`});
        }
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

        const product = {
            name: productObj.name,
            price: productObj.price,
            stock: productObj.stock,
        };

        try {
            const newProduct = await this.productCollection.insertOne(product);
            return newProduct.insertedId;
        } catch (error) {
            return ({'error': `Failed to create product: ${error}`});
        }
    }

    static async createManyProducts(listOfProductObj) {
        if (Object.entries(listOfProductObj).length <= 0) {
            return ({'error': 'List of products can\'t be empty'});
        }

        try {
            const newProducts = await this.productCollection.insertMany(listOfProductObj);
            return newProducts;   
        } catch (error) {
            return ({'error': `Failed to create products: ${error}`});
        }
    }

    static async updateProductByID(productID, updatedObj) {
        try {
            const productObj = this.getProductByID(productID);
            const updatedProduct = await this.productCollection.updateOne(productObj, updatedObj);
            return updatedProduct;
        } catch (error) {
            return ({'error': `Failed to update product: ${error}`});
        }
    }

    static async updateProduct(productObj, updatedObj) {
        try {
            const updatedProduct = await this.productCollection.updateOne(productObj, updatedObj);
            return updatedProduct;   
        } catch (error) {
            return ({'error': `Failed to update product: ${error}`});
        }
    }

    static async deleteProductByID(productID) {
        try {
            const product = this.getProductByID(productID);
            const deleted = await this.productCollection.deleteOne(product);
            return deleted.acknowledged;
        } catch (error) {
            return ({'error': `Failed to delete product: ${error}`});
        }
    }

    static async deleteManyProduct(listOfProductIDs) {
    }

}

export default ProductService;
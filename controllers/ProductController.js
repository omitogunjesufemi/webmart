import ProductService from '../services/ProductService';

class ProductController {
    static async viewProducts(request, response) {
        const products = await ProductService.getAllProducts();
        return response.status(200).json(products);
    }

    static async viewProduct(request, response) {
        const productID = request.params.id;
        const product = await ProductService.getProductByID(productID);
        return response.status(200).json(product);
    }

    static async newProduct(request, response) {
        const reqObj = request.body;
        const result = await ProductService.createProduct(reqObj);
        return response.json(result);
    }

    static async editProduct(request, response) {
        const reqObj = request.body;
        const productID = request.params.id;
        const result = await ProductService.updateProductByID(productID, reqObj);

        return response.json(result);
    }

    static async deleteProduct(request, response) {
        const productID = request.params.id;
        await ProductService.deleteProductByID(productID);
    }
}

export default ProductController;

import CartService from '../services/CartService';

class CartController {
    static async viewCarts(request, response) {
        const carts = await CartService.getAllCarts();
        if (!carts) {
            return response.status(404).json({'error': 'No carts available'});    
        }
        return response.status(200).json(carts);
    }

    static async viewCart(request, response) {
        const cartID = request.params.id;
        const cart = await CartService.getCartByID(cartID);
        if (!cart) {
            return response.status(404).json({'error': 'No carts available'});    
        }
        return response.status(200).json(cart);
    }

    static async viewUserCart(request, response) {
        const userID = request.params.id;
        const cart = await CartService.getCartByUserID(userID);
        if (!cart) {
            return response.status(404).json({'error': 'No carts available'});    
        }
        return response.status(200).json(cart);
    }

    static async newCart(request, response) {
        const reqObj = request.body;
        const result = await CartService.createCart(reqObj);
        if (!result) {
            return response.status(404).json({'error': 'Unable to create cart'});    
        }
        return response.json(result);
    }

    static async editCart(request, response) {
        const reqObj = request.body;
        const cartID = request.params.id;
        const result = await CartService.updateCartByID(cartID, reqObj);

        if (!result) {
            return response.status(404).json({'error': 'Unable to update cart'});
        }

        return response.json(result);
    }

    static async deleteCart(request, response) {
        const cartID = request.params.id;
        await CartService.deleteCartByID(cartID);
    }
}

export default CartController;

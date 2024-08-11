import OrderService from '../services/OrderService';

class OrderController {
    static async viewOrders(request, response) {
        const orders = await OrderService.getAllOrders();
        return response.status(200).json(orders);
    }

    static async viewOrder(request, response) {
        const orderID = request.params.id;
        const order = await OrderService.getOrderByID(orderID);
        return response.status(200).json(order);
    }

    static async newOrder(request, response) {
        const reqObj = request.body;
        const result = await OrderService.createOrder(reqObj);
        return response.json(result);
    }

    static async editOrder(request, response) {
        const reqObj = request.body;
        const orderID = request.params.id;
        const result = await OrderService.updateOrderByID(orderID, reqObj);

        return response.json(result);
    }

    static async deleteOrder(request, response) {
        const orderID = request.params.id;
        await OrderService.deleteOrderByID(orderID);
    }
}

export default OrderController;

import UserService from '../services/UserService';

class UserController {
    static async viewUsers(request, response) {
        const users = await UserService.getAllUsers();
        return response.status(200).json(users);
    }

    static async viewUser(request, response) {
        const userID = request.params.id;
        const user = await UserService.getUserByID(userID);
        return response.status(200).json(user);
    }

    static async newUser(request, response) {
        const reqObj = request.body;
        const result = await UserService.createUser(reqObj);
        return response.json(result);
    }

    static async editUser(request, response) {
        const reqObj = request.body;
        const userID = request.params.id;
        const result = await UserService.updateUserByID(userID, reqObj);

        return response.json(result);
    }

    static async deleteUser(request, response) {
        const userID = request.params.id;
        await UserService.deleteUserByID(userID);
    }
}

export default UserController;

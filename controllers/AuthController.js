import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserService from '../services/UserService';

class AuthController {
    static async signup(request, response) {
    }

    static async changePassword(request, response) {

    }

    static async login(request, response) {
        const { email, password } = request.body;

        if (!(email && password)) {
            return response.status(401).json({'error': 'Missing credentials'});
        }

        const user = UserService.getUserByEmail(email);

        const verifiedCred = await bcrypt.compare(password, user.password);

        if (verifiedCred === false) {
            return response.status(401).json({'error': 'Wrong password. Try again'});
        }

        const token = jwt.sign(
            {userId: user._id, email: user.email}, process.env.ACCESS_TOKEN_KEY,
            {expiresIn: '24h'}
        );

        return response.status(201).json({'token': token});
    }

    static async logout(request, response) {
    }
}

export default AuthController;

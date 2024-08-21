import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

class AuthController {
    static async signup(request, response) {
        const { firstName, lastName, email, password, telephone } = request.body;

        if (!(email && password && firstName && lastName)) {
            return response.status(401).json({'error': 'Missing credentials'});
        }

        const user = await UserService.getUserByEmail(email);
        if (user) {
            return response.status(404).json({'error': 'User already exist'});
        }

        const userObj = {
            firstName,
            lastName,
            email,
            password,
            telephone
        };
        const newUser = await UserService.createUser(userObj);

        return response.status(200).json(newUser);
    }

    static async changePassword(request, response) {

    }

    static async login(request, response) {
        const { email, password } = request.body;

        if (!(email && password)) {
            return response.status(401).json({'error': 'Missing credentials'});
        }

        const user = await UserService.getUserByEmail(email);

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

import UserService from '../services/UserService';

export default function verifyAdmin(roles) {
    return async (request, response, next) => {
        const { email, password } = request.body;
        const user = UserService.getUserByEmail(email);

        const isAdmin = 'admin' in roles || false;
        const isMerch = 'merch' in roles || false;
        const isBuyer = 'cust' in roles || false;

        if (!user) {
            return response.status(404).json({error: 'User not found'});
        }

        if (user.isBuyer === true && user.isBuyer === isBuyer) {
            next();
        }

        if (user.isMerch === true && user.isMerch === isMerch) {
            next();
        }

        if (user.isAdmin === true && user.isAdmin === isAdmin) {
            next();
        }

        return response.status(403).json({error: 'Not authorized for this endpoint'});
    };
}
import jwt from 'jsonwebtoken';

export default function VerifyToken(request, response, next) {
    const authorization = request.headers.authorization;
    const SECRET_KEY = process.env.ACCESS_TOKEN_KEY;

    if (!authorization) {
        return response.status(401).json({
            error: 'No Authorization Header'
        })
    }

    try {
        const token = authorization.split('Bearer ')[1];

        if (!token) {
            return response.status(401).json({
                error: 'Invalid Token Format'
            })
        }

        const decode = jwt.verify(token, SECRET_KEY);

        request.user = decode
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return response.status(401).json({
                message: 'Session Expired',
                error: error.message,
            })
        }

        if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
            return response.status(401).json({
                message: 'Invalid Token',
                error: error.message,
            })
        }

        response.status(500).json({
            message: 'Internal server Error',
            error: error.message,
            stack: error.stack
        });
    }
}

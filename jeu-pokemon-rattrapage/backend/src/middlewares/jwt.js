import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODE } from '../constants/http.js'

const jwtVerifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Token not found',
        });
    }

    const tokenArray = token.split(' ');
    if (tokenArray.length !== 2) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Invalid token',
        });
    }

    try {
        const decoded = jwt.verify(tokenArray[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Invalid token',
        });
    }
};

export {
    jwtVerifyToken
}
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Check for token in cookies first, then in Authorization header
    const token = req.cookies.token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden. Admin access only.' });
    }
    next();
};

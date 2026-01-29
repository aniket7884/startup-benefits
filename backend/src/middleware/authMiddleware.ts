import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}


export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    ) as JwtPayload;

    // ✅ Attach user
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default protect;

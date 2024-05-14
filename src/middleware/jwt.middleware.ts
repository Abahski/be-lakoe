import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

type AuthMiddlewareData = {
  id: number;
};
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;
      const token = authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({
          status: false,
          message: 'Unauthorized',
        });
      }
      const decoded = this.jwtService.verify(token, { secret: 'abc123' });
      req.user = decoded;
      if (!decoded) {
        return res.status(401).json({
          status: false,
          message: 'Unauthorized',
        });
      }
      res.locals.user = (decoded as AuthMiddlewareData).id;
      return next();
    } catch (error) {
      throw new UnauthorizedException('Token JWT tidak valid');
    }
  }
}

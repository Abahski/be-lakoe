import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserSelector = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

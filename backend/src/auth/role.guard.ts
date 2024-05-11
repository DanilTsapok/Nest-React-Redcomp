import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import Role from './role.enum';
import JwtAuthGuard from './jwt-auth.guard';
import RequestWithUser from './requestWithUser.interface';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return user?.roles.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
};

export default RoleGuard;

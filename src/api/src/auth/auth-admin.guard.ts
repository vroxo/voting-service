import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '@voting-service/core/user/domain';
import { Observable } from 'rxjs';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

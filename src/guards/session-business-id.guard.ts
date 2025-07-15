import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/users/schemas/user.schema';
import { Request } from 'express';
@Injectable()
export class SessionBusinessIdGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const bussinessId = req.cookies._session;
    if (!bussinessId) {
      throw new UnauthorizedException('No session or businessId found');
    }
    const user = await this.userModel.findById(bussinessId);
    if (!user) {
      throw new UnauthorizedException('Invalid businessId');
    }

    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class SessionBusinessIdGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const req = context.switchToHttp().getRequest<Request>();
    // const sessionUser = req.session?.user;

    // if (!sessionUser || !sessionUser.businessId) {
    //   throw new UnauthorizedException('No session or businessId found');
    // }

    // const user = await this.userModel.findById(sessionUser.businessId);
    // if (!user) {
    //   throw new UnauthorizedException('Invalid businessId');
    // }

    return true;
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { GoogleOauthDto } from 'src/users/dto/google.oauth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatchingPassword = await bcrypt.compare(password, user?.password);

    if (!isMatchingPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user) {
      const { password, ...userData } = user.toObject();
      return userData;
    }
    throw new UnauthorizedException();
  }

  async registerUser(dto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new BadRequestException('Email already exists');
    return this.usersService.create({ ...dto });
  }

  async googleOauthSignUp(googleData: GoogleOauthDto): Promise<UserDocument> {
    return await this.usersService.findOrCreateGoogleUser(googleData);
  }
}

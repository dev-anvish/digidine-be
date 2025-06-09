import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { User } from 'src/users/schemas/user.schema';
import { GoogleOauthDto } from 'src/users/dto/google.oauth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(email);
    console.log('user', user);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatchingPassword = await bcrypt.compare(password, user?.password);
    console.log(
      'Comparing password',
      password,
      'with hash',
      user?.password,
      isMatchingPassword,
    );

    // if (!isMatchingPassword) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
    // if (user && isMatchingPassword) {
    if (user) {
      const { password, ...userData } = user;
      return userData;
    }
    throw new UnauthorizedException();
  }

  async registerUser(dto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new BadRequestException('Email already exists');
    const hash = await bcrypt.hash(dto.password, 10);
    return this.usersService.create({ ...dto, password: hash });
  }

  async googleOauthSignUp(googleData: GoogleOauthDto): Promise<User> {
    return await this.usersService.findOrCreateGoogleUser(googleData);
  }
}

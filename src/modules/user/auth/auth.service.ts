import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/user/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/user/users/dto/create.user.dto';
import { UserDocument } from 'src/modules/user/users/schemas/user.schema';
import { GoogleOauthDto } from 'src/modules/user/users/dto/google.oauth.dto';
import { MailService } from 'src/mail/mail.service';

const otpStore = new Map<string, string>();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private mailService: MailService,
  ) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("User doesn't exists");
    }
    if (!user.password) {
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
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(dto.email, otp);
    setTimeout(() => otpStore.delete(dto.email), 5 * 60 * 1000); //5min
    return await this.mailService.sendOtp(dto.email, otp);
  }

  async googleOauthSignUp(googleData: GoogleOauthDto): Promise<UserDocument> {
    return await this.usersService.findOrCreateGoogleUser(googleData);
  }

  async verifyOtp(dto: CreateUserDto) {
    const { otp, ...rest } = dto;
    const stored = otpStore.get(rest.email);
    if (!stored) {
      throw new Error('OTP_EXPIRED');
    }
    if (stored !== otp) {
      throw new Error('Invalid_OTP');
    }
    otpStore.delete(rest.email);
    return this.usersService.create({ ...dto });
  }
}

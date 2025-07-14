import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthPayloadDto } from 'src/users/dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthDto } from 'src/users/dto/google.oauth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto, @Req() req: Request) {
    const data = await this.authService.registerUser(dto);
    return { isSuccess: true, data };
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.verifyOtp(dto);
    res.cookie('_session', user._id.toString(), {
      maxAge: 1000 * 60 * 60 * 24 * 10, //10 days
    });
    return { isSuccess: true, user };
  }

  @Post('login')
  async login(
    @Body() dto: AuthPayloadDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(dto);
    if (!user) throw new UnauthorizedException();
    res.cookie('_session', user._id.toString(), {
      maxAge: 1000 * 60 * 60 * 24 * 10, //10 days
    });
    return { isSuccess: true, data: user };
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res) {
    req.logout(() => res.send({ isSuccess: true, message: 'Logged out' }));
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/login')
  async googleAuth() {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.googleOauthSignUp(
      req.user as GoogleOauthDto,
    );
    res.cookie('_session', user._id.toString(), {
      maxAge: 1000 * 60 * 60 * 24 * 10, //10 days
    });
    return req.user;
  }

  @Get('logout')
  logOut(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return { isSuccess: false, message: 'Session destruction failed' };
      }
      res.clearCookie('connect.sid');
      return { isSuccess: false, message: 'Session destruction failed' };
    });
    return;
  }
}

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
import { SessionBusinessIdGuard } from './guards/session-business-id.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto, @Req() req: Request) {
    const user = await this.authService.registerUser(dto);
    req.session.user = {
      email: user.email,
      businessId: user._id,
    };
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) reject(err);
        else resolve(null);
      });
    });
    return { isSuccess: true, user };
  }

  @Post('login')
  async login(@Body() dto: AuthPayloadDto, @Req() req: Request) {
    const user = await this.authService.validateUser(dto);
    if (!user) throw new UnauthorizedException();
    req.session.user = {
      email: user?.email,
      businessId: user._id,
    };
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) reject(err);
        else resolve(null);
      });
    });
    return { isSuccess: true, data: user };
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res) {
    req.logout(() => res.send({ message: 'Logged out' }));
  }

  @UseGuards(SessionBusinessIdGuard)
  @Get('me')
  me(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/login')
  async googleAuth(@Req() req: Request) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleAuthRedirect(@Req() req: Request) {
    const user = await this.authService.googleOauthSignUp(
      req.user as GoogleOauthDto,
    );
    req.session.user = {
      email: user?.email,
      businessId: user._id,
    };
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) reject(err);
        else resolve(null);
      });
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

import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthPayloadDto } from 'src/users/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto, @Req() req: Request) {
    const user = await this.authService.registerUser(dto);
    req.session.user = {
      email: user.email,
    };
    return { isSuccess: true, user };
  }

  @Post('login')
  async login(@Body() dto: AuthPayloadDto, @Req() req: Request) {
    const user = await this.authService.validateUser(dto);
    if (!user) throw new UnauthorizedException();
    req.session.user = {
      email: user?.email,
    };
    return { isSuccess: true, data: user };
  }

  // @Post('logout')
  // logout(@Req() req, @Res() res) {
  //   req.logout(() => res.send({ message: 'Logged out' }));
  // }

  // @UseGuards(SessionAuthGuard)
  // @Get('me')
  // me(@Req() req) {
  //   return req.user;
  // }
}

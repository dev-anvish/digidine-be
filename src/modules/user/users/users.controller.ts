import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  //   @Post('login')
  //   login(@Body() payload: AuthPayloadDto) {
  //     return this.userService.validateUser(payload);
  //   }
}

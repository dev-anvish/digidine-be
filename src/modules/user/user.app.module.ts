import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [UsersModule, AuthModule, MenuModule, MailModule],
  controllers: [],
  providers: [],
})
export class UserAppModule {}

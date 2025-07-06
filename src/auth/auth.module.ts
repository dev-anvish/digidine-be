import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google-strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './config/google.oauth.config';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    ConfigModule.forFeature(googleOauthConfig),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, MailService],
  exports: [AuthService],
})
export class AuthModule {}

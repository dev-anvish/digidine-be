import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google-strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './config/google.oauth.config';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}

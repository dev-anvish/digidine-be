import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserAppModule } from './modules/user/user.app.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    UserAppModule,
    RouterModule.register([
      // {
      //   path: 'admin',
      //   module: AdminModule,
      // },
      {
        path: 'user',
        module: UserAppModule,
      },
      // {
      //   path: 'public',
      //   module: PublicModule,
      // },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

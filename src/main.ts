import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://digidine-business.vercel.app',
      'http://192.168.63.71:3000',
    ],
    credentials: true,
  });

  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
    }),
  );

  app.use(passport.initialize());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
}
bootstrap();

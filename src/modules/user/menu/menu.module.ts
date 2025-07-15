import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItem, MenuItemSchema } from './schemas/menu.schema';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { UsersModule } from 'src/modules/user/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItem.name, schema: MenuItemSchema },
    ]),
    UsersModule,
  ],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}

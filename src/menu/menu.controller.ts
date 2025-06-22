import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UpsertMenuItemDto } from './dto/menu.dto';
import { MenuService } from './menu.service';
import { SessionBusinessIdGuard } from '../auth/guards/session-business-id.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  me() {
    return 'hello';
  }

  @Post('addEdit')
  @UseGuards(SessionBusinessIdGuard)
  async EditUpdateMenuItem(
    @Body() dto: UpsertMenuItemDto,
    @Req() req: Request,
  ) {
    const businessId =
      req.session.user?.businessId || '685195eb2aa1229d53a5744d';
    const menuItem = await this.menuService.EditUpdateMenuItem(dto, businessId);
    return { isSuccess: true, menuItem };
  }

  @Post('list')
  @UseGuards(SessionBusinessIdGuard)
  async listMenu(@Req() req: Request, @Body() dto: any) {
    console.log("req",req)
    console.log({ dto });
    const businessId =
      req.session.user?.businessId || '685195eb2aa1229d53a5744d';
    const menuItems = await this.menuService.listMenuItems(businessId);
    return { isSuccess: true, menuItems };
  }
  @Delete('delete/:menuId')
  @UseGuards(SessionBusinessIdGuard)
  async deleteMenu(@Param('menuId') menuId: string) {
    return await this.menuService.deleteMenuItems(menuId);
  }
}

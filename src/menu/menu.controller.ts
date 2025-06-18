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

  @Post('addEdit')
  @UseGuards(SessionBusinessIdGuard)
  async EditUpdateMenuItem(
    @Body() dto: UpsertMenuItemDto,
    @Req() req: Request,
  ) {
    const businessId = req.session.user?.businessId;
    const menuItem = await this.menuService.EditUpdateMenuItem(dto, businessId);
    return { isSuccess: true, menuItem };
  }

  @Get('list')
  @UseGuards(SessionBusinessIdGuard)
  async listMenu(@Req() req: Request) {
    const businessId = req.session.user?.businessId;
    const menuItems = await this.menuService.listMenuItems(businessId);
    return { isSuccess: true, menuItems };
  }
  @Delete('delete/:menuId')
  @UseGuards(SessionBusinessIdGuard)
  async deleteMenu(@Param('menuId') menuId: string) {
    return await this.menuService.deleteMenuItems(menuId);
  }
}

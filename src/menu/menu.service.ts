import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MenuItem, MenuItemDocument } from './schemas/menu.schema';
import { Model, Types } from 'mongoose';
import { UpsertMenuItemDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuItem.name) private menuModel: Model<MenuItemDocument>,
  ) {}

  async EditUpdateMenuItem(
    dto: UpsertMenuItemDto,
    businessId?: Types.ObjectId,
  ) {
    if (dto.menuId && businessId) {
      const updated = await this.menuModel.findOneAndUpdate(
        { _id: dto.menuId, businessId },
        { itemInfo: dto.itemInfo },
        { new: true },
      );

      if (updated) return updated;
    }

    const created = new this.menuModel({
      businessId,
      itemInfo: dto.itemInfo,
    });
    return created.save();
  }

  async listMenuItems(businessId?: Types.ObjectId) {
    return this.menuModel.find({ businessId }).lean();
  }

  async deleteMenuItems(menuId?: string) {
    if (!menuId) {
      throw new BadRequestException('menuId is required');
    }

    try {
      const res = await this.menuModel.deleteOne({ _id: menuId });

      if (res.deletedCount === 0) {
        throw new NotFoundException(`Menu item with id ${menuId} not found`);
      }

      console.log(`✅ Menu item ${menuId} deleted successfully`);

      return {
        success: true,
        message: `Menu item ${menuId} deleted`,
      };
    } catch (err) {
      console.error(`❌ Error deleting menu item ${menuId}:`, err);
      throw err;
    }
  }
}

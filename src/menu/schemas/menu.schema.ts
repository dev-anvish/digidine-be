// menu/schemas/menu-item.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Addon {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  originalPrice: number;

  @Prop({ required: true })
  sellingPrice: number;
}
export const AddonSchema = SchemaFactory.createForClass(Addon);

@Schema({ _id: false })
export class ItemInfo {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  originalPrice: number;

  @Prop({ required: true })
  sellingPrice: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  category: string;

  @Prop({ enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE';

  @Prop()
  image: string;

  @Prop({ type: [AddonSchema], default: null })
  addons: Addon[];
}
export const ItemInfoSchema = SchemaFactory.createForClass(ItemInfo);

@Schema({ timestamps: true, collection: 'menu' })
export class MenuItem {
  @Prop({ required: true })
  businessId: string;

  @Prop({ type: ItemInfoSchema, required: true })
  itemInfo: ItemInfo;
}
export type MenuItemDocument = MenuItem & Document;
export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);

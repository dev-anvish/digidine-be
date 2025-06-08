import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true }) firstName: string;
  @Prop({ required: true }) lastName: string;
  @Prop({ required: true }) countryCode: string;
  @Prop({ required: true }) mobileNo: string;
  @Prop({ required: true }) businessName: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

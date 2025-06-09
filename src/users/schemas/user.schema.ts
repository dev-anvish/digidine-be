import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class User {
  @Prop() firstName?: string;
  @Prop() lastName?: string;
  @Prop() countryCode?: string;
  @Prop() mobileNo?: string;
  @Prop() businessName?: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop() password?: string;
  @Prop() googleId?: string;
  @Prop() picture?: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

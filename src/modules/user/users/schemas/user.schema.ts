import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

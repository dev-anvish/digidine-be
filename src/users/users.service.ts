import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<UserDocument> {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = new this.userModel({ ...dto, password: hashedPassword });
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  async findOrCreateGoogleUser(googleData: {
    email: string;
    name: string;
    picture: string;
    accessToken: string;
  }): Promise<User> {
    let user = await this.userModel.findOne({ email: googleData.email });

    if (!user) {
      const [firstName, ...lastNameParts] = googleData.name.split(' ');
      const lastName = lastNameParts.join(' ') || '';

      user = new this.userModel({
        email: googleData.email,
        firstName,
        lastName,
        password: null,
        googleId: googleData.accessToken,
        picture: googleData.picture,
      });
      await user.save();
    }
    return user;
  }
}

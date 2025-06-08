import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = new this.userModel({ ...dto, password: hashedPassword });
      const savedUser = await user.save();
      console.log('User saved:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }
}

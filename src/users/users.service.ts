import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersInterface } from 'src/users/users.interface';
import { CreateUsersDTO } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UsersInterface>,
  ) {}

  async addUser(createUsersDTO: CreateUsersDTO): Promise<UsersInterface> {
    const addedTodo = await new this.userModel(createUsersDTO);
    return addedTodo.save();
  }
  async finduser(username: string): Promise<any | undefined> {
    return this.userModel.findOne({ username: username });
  }
}

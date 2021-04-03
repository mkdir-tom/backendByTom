import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersInterface } from 'src/users/users.interface';
import { CreateUsersDTO } from './dto/create-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UsersInterface>,
  ) {}

  async addUser(createUsersDTO: CreateUsersDTO): Promise<UsersInterface> {
    const existingUsername = await this.userModel
      .findOne({ username: createUsersDTO.username })
      .exec();

    if (existingUsername)
      throw new ConflictException('This username is taken, try another.');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUsersDTO.password, salt);
    const newUser = await this.userModel.create({
      username: createUsersDTO.username,
      password: hashedPassword,
      firstname: createUsersDTO.firstname,
      lastname: createUsersDTO.lastname,
    });

    return newUser;
  }

  async findByUsername(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (!user) return null;

    return {
      userId: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    };
  }
}

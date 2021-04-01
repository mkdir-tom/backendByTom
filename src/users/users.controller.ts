import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUsersDTO } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersSvc: UsersService) {}

  @Post()
  async addUser(@Res() res, @Body() createUsersDTO: CreateUsersDTO) {
    const addedUser = await this.usersSvc.addUser(createUsersDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfuly added!',
      user: addedUser,
    });
  }
}

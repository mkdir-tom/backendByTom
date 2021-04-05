import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
      user: {
        _id: addedUser._id,
        username: addedUser.username,
        firstname: addedUser.firstname,
        lastname: addedUser.lastname,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
    // return `username:${req.user.username} FirstName:${req.user.username} Lastname:${req.user.lastname}`;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodosDTO } from './dto/create-todos.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private todosSvc: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTodos(@Req() req) {
    return this.todosSvc.getTodos(req.query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTodo(@Res() res, @Param('id') id) {
    const fetchedTodo = await this.todosSvc.getTodo(id);
    if (!fetchedTodo) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json(fetchedTodo);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addTodo(@Res() res, @Body() createTodosDTO: CreateTodosDTO) {
    const addedTodo = await this.todosSvc.addTodo(createTodosDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfuly added!',
      user: addedTodo,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateTodo(
    @Res() res,
    @Param('id') id: String,
    @Body() createTodosDTO: CreateTodosDTO,
  ) {
    const updatedTodo = await this.todosSvc.updateTodo(id, createTodosDTO);
    if (!updatedTodo) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated!',
      user: updatedTodo,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteTodo(@Res() res, @Param('id') id) {
    const deletedTodo = await this.todosSvc.deleteTodo(id);
    if (!deletedTodo) {
      throw new NotFoundException('User Does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully deleted!',
      user: deletedTodo,
    });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodosDTO } from './dto/create-todos.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateTodosDTO } from './dto/update-todos.dto';
import { title } from 'node:process';

@Controller('todos')
export class TodosController {
  SERVER_URL: string = 'http://localhost:3000/';
  constructor(private todosSvc: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTodos(
    @Query('page') page: number | 1,
    @Query('perPage') size: number | 10,
    @Request() req,
  ) {
    const userId = req.user.userId;
    const todos = this.todosSvc.getTodos(page, size, userId);
    return todos;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTodo(@Res() res, @Param('id') id) {
    const fetchedTodo = await this.todosSvc.getTodo(id);
    if (!fetchedTodo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json(fetchedTodo);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addTodo(
    @Request() req,
    @Res() res,
    @Body() createTodosDTO: CreateTodosDTO,
  ) {
    createTodosDTO.userId = req.user.userId;
    const addedTodo = await this.todosSvc.addTodo(createTodosDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfuly added!',
      todo: {
        title: addedTodo.title,
        description: addedTodo.description,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateTodo(
    @Res() res,
    @Param('id') id: String,
    @Body() updateTodosDTO: UpdateTodosDTO,
  ) {
    const updatedTodo = await this.todosSvc.updateTodo(id, updateTodosDTO);
    if (!updatedTodo) throw new NotFoundException('Todo does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully updated!',
      todo: updatedTodo,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteTodo(@Res() res, @Param('id') id) {
    const deletedTodo = await this.todosSvc.deleteTodo(id);
    if (!deletedTodo) throw new NotFoundException('Todo Does not exist!');

    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully deleted!',
      todo: deletedTodo,
    });
  }
}

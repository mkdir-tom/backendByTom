import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodosInterface } from './todos.interface';
import { CreateTodosDTO, QueryOptions } from './dto/create-todos.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<TodosInterface>,
  ) {}

  async getTodos(options: QueryOptions) {
    const todos = await this.todoModel
      .find()
      .skip(Number(options.page))
      .limit(Number(options.perpage))
      .exec();
    return todos;
  }

  async getTodo(id): Promise<TodosInterface> {
    const fetchedTodo = await this.todoModel.findById({ _id: id }).exec();
    if (!fetchedTodo) {
      throw new NotFoundException('Invalid ID!');
    }
    return fetchedTodo;
  }

  async addTodo(createTodosDTO: CreateTodosDTO): Promise<TodosInterface> {
    const addedTodo = await new this.todoModel(createTodosDTO);
    return addedTodo.save();
  }

  async updateTodo(
    id,
    createTodosDTO: CreateTodosDTO,
  ): Promise<TodosInterface> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(
      id,
      createTodosDTO,
      { new: true },
    );
    return updatedTodo;
  }

  async deleteTodo(id): Promise<TodosInterface> {
    const deletedTodo = await this.todoModel.findByIdAndRemove(id);
    return deletedTodo;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodosInterface } from './todos.interface';
import { CreateTodosDTO } from './dto/create-todos.dto';
import { UpdateTodosDTO } from './dto/update-todos.dto';
import { title } from 'node:process';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<TodosInterface>,
  ) {}

  async getTodos(page: number, size: number, userId: string) {
    const todos = await this.todoModel
      .find({ userId: userId }, '_id title description')
      .skip(this.calSkip(page, size))
      .limit(Number(size))
      .exec();
    const todosCount = await this.todoModel.countDocuments().exec();
    return {
      detail: todos,
      currentPage: page,
      pages: this.calPage(todosCount, size),
      currentCount: todos.length,
      totalCount: todosCount,
    };
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
    updateTodosDTO: UpdateTodosDTO,
  ): Promise<TodosInterface> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(
      id,
      updateTodosDTO,
      { new: true },
    );
    return updatedTodo;
  }

  async deleteTodo(id): Promise<TodosInterface> {
    const deletedTodo = await this.todoModel.findByIdAndRemove(id);
    return deletedTodo;
  }

  private calSkip(page: number, size: number): number {
    return (page - 1) * size;
  }

  private calPage(count: number, size: number): number {
    return Math.ceil(count / size);
  }
}

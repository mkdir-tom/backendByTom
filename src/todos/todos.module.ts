import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodosSchemas } from './schemas/todos.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Todo', schema: TodosSchemas }]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

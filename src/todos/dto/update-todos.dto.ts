import { PartialType } from '@nestjs/mapped-types';
import { CreateTodosDTO } from './create-todos.dto';

export class UpdateTodosDTO extends PartialType(CreateTodosDTO) {}

import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTodosDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  readonly title: string;
  readonly description: string;
}

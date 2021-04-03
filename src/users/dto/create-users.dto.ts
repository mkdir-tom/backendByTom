import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUsersDTO {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  readonly lastname: string;
}

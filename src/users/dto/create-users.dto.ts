export class CreateUsersDTO {
  readonly username: string;
  readonly password: string;
  readonly firstname: string;
  readonly lastname: string;
}
export class QueryOptions {
  page?: Number;
  perpage?: Number;
}

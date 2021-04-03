import { Document } from 'mongoose';

export interface UsersInterface extends Document {
  readonly username: string;
  readonly password: string; // https://www.peppercarrot.com/extras/html/2016_cat-generator/avatar.php?seed=1
  readonly firstname: string;
  readonly lastname: string;
}

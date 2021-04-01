import { Document } from 'mongoose';

export interface UsersInterface extends Document {
  username: string;
  password: string; // https://www.peppercarrot.com/extras/html/2016_cat-generator/avatar.php?seed=1
  firstname: string;
  lastname: string;
}

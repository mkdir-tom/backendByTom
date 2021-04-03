import { Document } from 'mongoose';

export interface TodosInterface extends Document {
  readonly title: string;
  readonly description: string;
}

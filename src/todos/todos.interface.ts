import { Document } from 'mongoose';

export interface TodosInterface extends Document {
  title: string;
  description: string;
}

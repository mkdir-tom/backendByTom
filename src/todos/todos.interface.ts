import { Document } from 'mongoose';

export interface TodosInterface extends Document {
  readonly _id: string;
  readonly title: string;
  readonly description: string;
}

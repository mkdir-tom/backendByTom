import * as mongoose from 'mongoose';

export const TodosSchemas = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  userId: { type: String, required: true },
});

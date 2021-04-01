import * as mongoose from 'mongoose';

export const TodosSchemas = new mongoose.Schema({
  title: String,
  description: String,
});

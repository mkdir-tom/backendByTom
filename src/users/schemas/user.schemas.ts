import * as mongoose from 'mongoose';

export const UsersSchemas = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

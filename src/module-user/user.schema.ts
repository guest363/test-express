import * as argon2 from 'argon2';
import mongoose, { Model, Schema, SchemaDefinitionProperty } from 'mongoose';
import validator from 'validator';

interface User {
  login: string;
  email: string;
  password: string;
  registerDate: SchemaDefinitionProperty<number> | undefined;
}
export const userSchema = new Schema<User>({
  login: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  registerDate: { type: Date, default: Date.now },
});

/* Важно. Чтобы при выдаче можно было обращаться к виртуальным функциям */
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

/* Virual support functions */
/**
 * Пароль пишется в виде хеша алгоритма argon2
 */
userSchema
  .virtual('password')
  .set(async function (this: User, password?: string) {
    if (password) {
      this.password = await argon2.hash(password);
    }
  })
  .get(function () {
    return `User password can't be getting`;
  });

/* Methods */
userSchema.methods.checkPassword = async function (
  this: User,
  password: string
) {
  if (!password) return false;
  return await argon2.verify(password, this.password);
};

/* Model */
export const userModel: Model<User> = mongoose.model(
  'userModel',
  userSchema,
  'user'
);

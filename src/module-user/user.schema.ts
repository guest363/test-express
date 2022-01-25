import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import mongoose, { Model, Schema, SchemaDefinitionProperty } from 'mongoose';
import validator from 'validator';
import { config } from '../common/config';

interface UserSign {
  email: string;
}
interface User {
  login: string;
  email: string;
  password: string;
  registerDate: SchemaDefinitionProperty<number> | undefined;
  checkPassword: (password: string) => boolean;
  generateToken: (props: UserSign) => string;
  encryptPassword: () => void;
  _plainPassword: string;
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
  password: String,
  registerDate: { type: Date, default: Date.now },
});

/* Важно. Чтобы при выдаче можно было обращаться к виртуальным функциям */
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

/* Virual support functions */
/**
 * Пароль пишется в виде хеша алгоритма argon2
 * А так как argon2 возвращает хеш асинхронно
 * нужно городить костыль с методом и pre валидацией
 */
userSchema
  .virtual('_plainPassword')
  .set(async function (this: User, password?: string) {
    if (password) {
      this._plainPassword = password;
    }
  })
  .get(function (this: User) {
    return this.password;
  });

/* Methods */
userSchema.methods.encryptPassword = async function encryptPassword() {
  this.password = await argon2.hash(this._plainPassword);
};

userSchema.methods.checkPassword = async function (
  this: User,
  password: string
) {
  if (!password) return false;

  return await argon2.verify(this.password, password);
};

userSchema.methods.generateToken = async function (user: UserSign) {
  return jwt.sign({ email: user.email }, config.JWT_SECRET_KEY, {
    expiresIn: config.JWT_SECRET_EXPIRATION,
  });
};

userSchema.pre('validate', function preValidate(next) {
  return this.encryptPassword().then(next);
});

/* Model */
export const userModel: Model<User> = mongoose.model(
  'userModel',
  userSchema,
  'user'
);

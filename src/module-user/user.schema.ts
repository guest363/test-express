import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import mongoose, { Model, Schema, SchemaDefinitionProperty } from 'mongoose';
import validator from 'validator';
import { config } from '../common/config';

const hash = crypto.createHash('md5');
export interface UserSign {
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

userSchema
  .virtual('_plainPassword')
  .set(function (this: User, password?: string) {
    if (password) {
      this._plainPassword = password;
    }
  })
  .get(function (this: User) {
    return this.password;
  });

/* Methods */

userSchema.methods.encryptPassword = async function encryptPassword() {
  const result = hash.update(this._plainPassword).copy().digest('hex');
  this.password = result;
};

/**
 * When a user calls the `checkPassword` method,
 * we check the password they provide against the
 * password hash stored in the database.
 */
userSchema.methods.checkPassword = async function (
  this: User,
  password: string
) {
  if (!password) return false;

  const result = hash.update(password).copy().digest('hex');

  return this.password === result;
};

userSchema.methods.generateToken = function (user: UserSign) {
  return jwt.sign({ email: user.email } as UserSign, config.JWT_SECRET_KEY, {
    expiresIn: config.JWT_SECRET_EXPIRATION,
  });
};

/* Encrypting the password before saving the user. */
userSchema.pre('validate', function preValidate(next) {
  return this.encryptPassword().then(next);
});

/* Model */
export const UserModel: Model<User> = mongoose.model(
  'userModel',
  userSchema,
  'user'
);

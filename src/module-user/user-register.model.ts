import mongoose from 'mongoose';
import { userRegisterSchema } from './user-register.schema';

export const NewUser = mongoose.model('User', userRegisterSchema);

import mongoose from 'mongoose';
import { userAuthSchema } from './user-auth.schema';

export const AuthUser = mongoose.model('User', userAuthSchema);

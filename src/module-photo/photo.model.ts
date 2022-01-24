import mongoose from 'mongoose';
import { photoSchema } from './photo.shcema';

export const Photo = mongoose.model('Photo', photoSchema);

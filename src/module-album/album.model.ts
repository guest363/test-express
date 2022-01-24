import mongoose from 'mongoose';
import { albumSchema } from './album.schema';

export const Album = mongoose.model('Album', albumSchema);

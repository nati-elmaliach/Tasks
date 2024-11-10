import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  content: string;
  status: 'pending' | 'in-progress' | 'completed'
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

export default mongoose.model<ITask>('Task', TaskSchema);
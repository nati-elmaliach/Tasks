export interface ITask {
    _id: string;
    title: string;
    content: string;
    status: 'pending' | 'in-progress' | 'completed';
  }
  
  export type NewTask = Omit<ITask, 'id'>;
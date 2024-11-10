import { Router, Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

const router = Router();

// Create a new task
router.post('/', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const task: ITask = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to create task' });
  }
});

// Get all Tasks
router.get('/', async (_req: Request, res: Response) => {
  try {
    const tasks: ITask[] = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get task by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Update task
router.put('/:id', async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const post = await Task.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;

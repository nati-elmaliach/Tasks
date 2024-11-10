import { Router, Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

const router = Router();

// Create a new task
router.post('/', async (req: Request, res: Response) => {
  try {
    const post: ITask = await Task.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create post' });
  }
});

// Get all Tasks
router.get('/', async (_req: Request, res: Response) => {
  try {
    const posts: ITask[] = await Task.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get task by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await Task.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Update task
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const post = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update post' });
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

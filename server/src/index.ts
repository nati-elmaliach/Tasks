import express from 'express';
import connectDB from './config/db';
import taskRoutes from './routes/task.routes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Routes
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
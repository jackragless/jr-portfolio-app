import 'reflect-metadata'; // Required for TypeORM decorators
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes';
import profileRoutes from './routes/profileRoutes';
import experienceRoutes from './routes/experienceRoutes';
import educationRoutes from './routes/educationRoutes';
import technologyRoutes from './routes/technologyRoutes';
import { initializeDatabase } from './config/database';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 8000; 

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/', (req, res) => {
  res.send('Portfolio API is running!');
});

// Use routes
app.use('/api/projects', projectRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/technologies', technologyRoutes);

// Initialize database
let isDbInitialized = false;
const initDb = async () => {
  if (!isDbInitialized) {
    try {
      await initializeDatabase();
      isDbInitialized = true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    try {
      await initDb();
      app.listen(port, () => {
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };
  
  startServer();
}

// For Vercel serverless function
export default async (req: any, res: any) => {
  try {
    await initDb();
    return app(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    return res.status(500).send('Internal Server Error');
  }
};
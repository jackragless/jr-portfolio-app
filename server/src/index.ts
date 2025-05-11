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

// Basic CORS configuration - simplified to avoid issues
app.use(cors());

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

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize the database connection
    await initializeDatabase();
    
    // Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
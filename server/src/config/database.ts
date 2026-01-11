import { DataSource } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';
import { Project } from '../models/Project';
import { Profile } from '../models/Profile';
import { Experience } from '../models/Experience';
import { Education } from '../models/Education';
import { Technology } from '../models/Technology';

// Load environment variables
dotenv.config();

// Database path from environment or default to a local file
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../../data/portfolio.sqlite');

// Ensure the data directory exists
import fs from 'fs';
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Create and export the data source
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath,
  entities: [Project, Profile, Experience, Education, Technology],
  synchronize: true, // Auto-create tables in development
  logging: process.env.NODE_ENV === 'development',
});

// Initialize database connection
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    return AppDataSource;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};
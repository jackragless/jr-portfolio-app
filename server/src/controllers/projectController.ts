import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Project } from '../models/Project';

// Get the repository
const projectRepository = AppDataSource.getRepository(Project);

// Get all projects
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await projectRepository.find({
      order: {
        createdAt: 'DESC'
      }
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};
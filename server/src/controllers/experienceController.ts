import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Experience } from '../models/Experience';

// Get the repository
const experienceRepository = AppDataSource.getRepository(Experience);

// Get all experience items
export const getExperiences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experiences = await experienceRepository.find({
      order: {
        order: 'ASC' // Order by the 'order' field
      }
    });
    
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences', error });
  }
};
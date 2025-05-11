import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Education } from '../models/Education';

// Get the repository
const educationRepository = AppDataSource.getRepository(Education);

// Get all education items
export const getEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const education = await educationRepository.find({
      order: {
        order: 'ASC' // Order by the 'order' field
      }
    });
    
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education', error });
  }
};
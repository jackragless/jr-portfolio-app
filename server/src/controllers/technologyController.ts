import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Technology } from '../models/Technology';

// Get the repository
const technologyRepository = AppDataSource.getRepository(Technology);

// Get all technologies
export const getTechnologies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const technologies = await technologyRepository.find({
      order: {
        order: 'ASC'
      }
    });
    
    res.status(200).json(technologies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching technologies', error });
  }
};
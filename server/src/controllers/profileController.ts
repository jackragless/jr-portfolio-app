import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Profile } from '../models/Profile';

// Get profile data
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the repository inside the function to ensure database is initialized
    const profileRepository = AppDataSource.getRepository(Profile);
    
    // In TypeORM 0.3.x+, findOne requires selection criteria
    // Use findOneOrFail with where option instead of just order
    const profile = await profileRepository.findOne({
      where: {},  // Empty where clause to select any record
      order: {
        createdAt: 'DESC'
      }
    });
        
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile', error: String(error) });
  }
};
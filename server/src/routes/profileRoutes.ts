import express, { RequestHandler } from 'express';
import { getProfile } from '../controllers/profileController';

const router = express.Router();

// Cast the controller function to RequestHandler to satisfy TypeScript
const getProfileHandler = getProfile as RequestHandler;

// Route to get profile data
router.get('/', getProfileHandler);

export default router;
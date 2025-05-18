import axios from 'axios';

// Determine the base URL based on the environment
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // In production, use relative path
  : 'http://localhost:8000/api';  // In development, use localhost

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: false, // Changed from true to false
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  config => {
    console.log(`Making request to: ${config.url}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor with more detailed error handling
apiClient.interceptors.response.use(
  response => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  error => {
    // Enhanced error logging
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error(`API Error (${error.response.status}):`, error.response.data);
      console.error(`Request URL: ${error.config.url}`);
      console.error(`Request Method: ${error.config.method}`);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received from server:', error.request);
      console.error(`Request URL: ${error.config.url}`);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Define interfaces for our models
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  bioExtended: string;
  avatarUrl?: string;
  location?: string;
  locationUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  discordUrl?: string;
  email?: string;
  resumeUrl?: string;
  createdAt: string;
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  period: string;
  description: string;
  order: number;
  createdAt: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  order: number;
  createdAt: string;
}

export interface Technology {
  id: number;
  name: string;
  category: string;
  order: number;
  icon?: string;
  imageUrl?: string;
  url?: string;
  createdAt: string;
}

// Define data types that the API can fetch
export type DataType = 'projects' | 'profile' | 'experiences' | 'education' | 'technologies';

// Define return types for each data type
export type DataTypeReturn<T extends DataType> = 
  T extends 'projects' ? Project[] :
  T extends 'profile' ? Profile :
  T extends 'experiences' ? Experience[] :
  T extends 'education' ? Education[] :
  T extends 'technologies' ? Technology[] :
  never;

// Consolidated API service
export const ApiService = {
  /**
   * Generic fetch method for all data types
   * @param type The type of data to fetch
   * @returns Promise with the data of the appropriate type
   */
  fetch: async <T extends DataType>(type: T): Promise<DataTypeReturn<T>> => {
    try {
      const endpoint = type === 'education' ? '/education' : `/${type}`;
      const response = await apiClient.get(endpoint);
      return response.data as DataTypeReturn<T>;
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error);
      throw error;
    }
  },

  /**
   * Fetch a specific item by ID
   * @param type The type of data to fetch
   * @param id The ID of the item to fetch
   * @returns Promise with the data of the appropriate type
   */
  fetchById: async <T extends Exclude<DataType, 'profile' | 'projects'>>(
    type: T, 
    id: string | number
  ) => {
    try {
      const endpoint = type === 'education' ? `/education/${id}` : `/${type}/${id}`;
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch ${type} with ID ${id}:`, error);
      throw error;
    }
  },
};

// Legacy support for existing code (can be removed later)
export const ProjectService = {
  getProjects: async (): Promise<Project[]> => ApiService.fetch('projects')
};

export const ProfileService = {
  getProfile: async (): Promise<Profile> => ApiService.fetch('profile')
};

export const ExperienceService = {
  getExperiences: async (): Promise<Experience[]> => ApiService.fetch('experiences')
};

export const EducationService = {
  getEducation: async (): Promise<Education[]> => ApiService.fetch('education')
};

export const TechnologyService = {
  getTechnologies: async (): Promise<Technology[]> => ApiService.fetch('technologies')
};
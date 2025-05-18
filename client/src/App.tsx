import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, MantineProvider, createTheme, ColorSchemeScript, Progress } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import { 
  ProfileService, 
  Profile,
  ProjectService,
  Project,
  ExperienceService,
  Experience,
  EducationService,
  Education,
  TechnologyService,
  Technology,
} from './services/api';
import './App.css';

// Define the type to match what Header expects
interface SectionRefs {
  about: React.RefObject<HTMLDivElement | null>;
  technologies: React.RefObject<HTMLDivElement | null>;
  projects: React.RefObject<HTMLDivElement | null>;
}

// Create theme
const theme = createTheme({
  // You can customize your theme here
});

function App() {
  // Create refs for each section
  const aboutRef = useRef<HTMLDivElement>(null);
  const technologiesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Data states
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const [loadingStates, setLoadingStates] = useState({
    profile: true,
    projects: true,
    experiences: true,
    education: true,
    technologies: true,
  });

  // Calculate overall loading state
  const isLoading = Object.values(loadingStates).some(state => state);
  
  // Fetch all data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await ProfileService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingStates(prev => ({ ...prev, profile: false }));
      }
    };

    const fetchProjects = async () => {
      try {
        const data = await ProjectService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoadingStates(prev => ({ ...prev, projects: false }));
      }
    };

    const fetchExperiences = async () => {
      try {
        const data = await ExperienceService.getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoadingStates(prev => ({ ...prev, experiences: false }));
      }
    };

    const fetchEducation = async () => {
      try {
        const data = await EducationService.getEducation();
        setEducation(data);
      } catch (error) {
        console.error("Error fetching education:", error);
      } finally {
        setLoadingStates(prev => ({ ...prev, education: false }));
      }
    };

    const fetchTechnologies = async () => {
      try {
        const data = await TechnologyService.getTechnologies();
        setTechnologies(data);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      } finally {
        setLoadingStates(prev => ({ ...prev, technologies: false }));
      }
    };
    
    fetchProfile();
    fetchProjects();
    fetchExperiences();
    fetchEducation();
    fetchTechnologies();
  }, []);
  
  const allDataLoaded = Object.values(loadingStates).every(status => !status);
  const loadingProgress = 
    (Object.values(loadingStates).filter(status => !status).length / 
      Object.values(loadingStates).length) * 100;

  // Section refs object for passing to components
  const sectionRefs: SectionRefs = {
    about: aboutRef,
    technologies: technologiesRef,
    projects: projectsRef
  };
  
  // Store color scheme preference in local storage, defaulting to system preference
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark' | 'auto'>({
    key: 'portfolio-color-scheme',
    defaultValue: 'auto',
  });

  // Function to toggle between light, dark, and auto modes
  const toggleColorScheme = (value?: 'light' | 'dark' | 'auto') => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : colorScheme === 'light' ? 'auto' : 'dark'));
  };
  
  // Function to scroll to sections
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement | null>) => {
    if (sectionRef.current) {
      const yOffset = -60; // Accounting for fixed header
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider 
        theme={theme}
        forceColorScheme={colorScheme === 'auto' ? undefined : colorScheme}
      >
        <Box 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            position: 'relative',
            backgroundColor: 'transparent', 
          }}
        >
          <Header 
            scrollToSection={scrollToSection} 
            sectionRefs={sectionRefs} 
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          />
          {!allDataLoaded && (
            <Progress 
              value={loadingProgress} 
              striped 
              animated 
              size="sm" 
              style={{ position: 'fixed', top: 60, left: 0, right: 0, zIndex: 1000, backgroundColor: 'transparent' }}
              color={undefined}
            />
          )}
          <Box 
            component="main" 
            className="main-content" 
            style={{ 
              marginTop: '60px', 
              flex: 1,
              paddingTop: allDataLoaded ? 0 : '4px' 
            }}
          >
            <Routes>
              <Route 
                path="/" 
                element={
                  <MainPage 
                    sectionRefs={sectionRefs} 
                    profile={profile}
                    projects={projects}
                    experiences={experiences}
                    education={education}
                    technologies={technologies}
                    allDataLoaded={allDataLoaded}
                  />
                } 
              />
            </Routes>
          </Box>
          <Footer profile={profile} isLoading={isLoading} />
        </Box>
      </MantineProvider>
    </>
  );
}

export default App;

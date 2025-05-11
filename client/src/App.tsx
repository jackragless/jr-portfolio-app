import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, MantineProvider, createTheme, ColorSchemeScript } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
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
          }}
        >
          <Header 
            scrollToSection={scrollToSection} 
            sectionRefs={sectionRefs} 
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          />
          <Box 
            component="main" 
            className="main-content" 
            style={{ 
              marginTop: '60px', 
              flex: 1,
              borderRadius: '12px 12px 0 0', 
              marginBottom: '-1px', 
            }}
          >
            <Routes>
              <Route path="/" element={<MainPage sectionRefs={sectionRefs} />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </MantineProvider>
    </>
  );
}

export default App;

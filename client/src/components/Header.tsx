import React from 'react';
import { 
  Box, 
  Group, 
  Container, 
  Button, 
  Text, 
  ActionIcon, 
  Tooltip, 
  Burger, 
  Menu
} from '@mantine/core';
import { useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon, IconFileDownload } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Profile } from '../services/api';

// Added a global style for Indie Flower font
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap');
`;

const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

interface HeaderProps {
  scrollToSection: (sectionRef: React.RefObject<HTMLDivElement | null>) => void;
  sectionRefs: {
    about: React.RefObject<HTMLDivElement | null>;
    technologies: React.RefObject<HTMLDivElement | null>;
    projects: React.RefObject<HTMLDivElement | null>;
  };
  colorScheme: 'light' | 'dark' | 'auto';
  toggleColorScheme: (value?: 'light' | 'dark' | 'auto') => void;
  profile?: Profile;
}


const Header: React.FC<HeaderProps> = ({ scrollToSection, sectionRefs, colorScheme, toggleColorScheme, profile }) => {
  const computedColorScheme = useComputedColorScheme();
  const isDark = computedColorScheme === 'dark';
  const [opened, { toggle, close }] = useDisclosure(false);

  // Simple toggle function that switches between light and dark
  const handleToggleTheme = () => {
    toggleColorScheme(isDark ? 'light' : 'dark');
  };

  // Close mobile menu after clicking a navigation item
  const handleNavClick = (sectionRef: React.RefObject<HTMLDivElement | null>) => {
    scrollToSection(sectionRef);
    close();
  };

  const navItems = (
    <>
      <Button variant="subtle" onClick={() => handleNavClick(sectionRefs.about)}>
        About
      </Button>
      <Button variant="subtle" onClick={() => handleNavClick(sectionRefs.technologies)}>
        Technologies
      </Button>
      <Button variant="subtle" onClick={() => handleNavClick(sectionRefs.projects)}>
        Projects
      </Button>
      <Button 
        component="button"
        onClick={() => window.open(profile?.resumeUrl, '_blank')}
        variant="subtle"
        leftSection={<IconFileDownload size={16} />}
        title={!profile?.resumeUrl ? "Resume not available yet" : "Download Resume"}
      >
        Resume
      </Button>
    </>
  );

  return (
    <Box
      component="header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: isDark ? '#0A0A0B' : '#F6F6F7',
        borderBottom: `1px solid ${isDark ? '#2C2E33' : '#e9ecef'}`,
        zIndex: 100,
      }}
    >
      <Container size="xl" style={{ height: '100%' }}>
        <Group justify="space-between" style={{ height: '100%' }}>
          <Text 
            size="25px" 
            fw={700} 
            c={isDark ? 'blue.4' : 'blue'} 
            component="span" 
            style={{ cursor: 'pointer', fontFamily: "Just Me Again Down Here" }} 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            J.R.
          </Text>

          {/* Desktop Navigation (hidden on mobile) */}
          <Box style={{ display: 'flex', alignItems: 'center' }} visibleFrom="sm">
            {navItems}
            <Tooltip label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              <ActionIcon 
                variant="subtle" 
                size="lg" 
                onClick={handleToggleTheme} 
                aria-label="Toggle theme"
              >
                {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>
            </Tooltip>
          </Box>

          {/* Mobile Navigation (visible only on mobile) */}
          <Group hiddenFrom="sm">
            <Tooltip label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              <ActionIcon 
                variant="subtle" 
                size="lg" 
                onClick={handleToggleTheme} 
                aria-label="Toggle theme"
              >
                {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>
            </Tooltip>
            
            <Menu
              position="bottom-end"
              shadow="md"
              width={200}
              opened={opened}
              onChange={toggle}
              closeOnItemClick
            >
              <Menu.Target>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  aria-label="Toggle navigation"
                  size="sm"
                  color={isDark ? "white" : "black"}
                />
              </Menu.Target>
              
              <Menu.Dropdown>
                <Menu.Item onClick={() => handleNavClick(sectionRefs.about)}>
                  About
                </Menu.Item>
                <Menu.Item onClick={() => handleNavClick(sectionRefs.technologies)}>
                  Technologies
                </Menu.Item>
                <Menu.Item onClick={() => handleNavClick(sectionRefs.projects)}>
                  Projects
                </Menu.Item>
                <Menu.Item
                  onClick={() => profile?.resumeUrl && window.open(profile.resumeUrl, '_blank')}
                  disabled={!profile?.resumeUrl}
                >
                  Resume
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};

export default Header;
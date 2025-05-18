import React from 'react';
import { Container, Text, Group, Anchor, Box } from '@mantine/core';
import { useComputedColorScheme } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandDiscord } from '@tabler/icons-react';
import { Profile } from '../services/api';

interface FooterProps {
  profile?: Profile;
  isLoading: boolean; // Add isLoading prop
}

const Footer: React.FC<FooterProps> = ({ profile, isLoading }) => { // Destructure isLoading
  const currentYear = new Date().getFullYear();
  const computedColorScheme = useComputedColorScheme();
  const isDark = computedColorScheme === 'dark';

  if (isLoading) { // Conditionally render null if loading
    return null;
  }
  
  return (
    <Box
      component="footer"
      py="md"
      style={{
        borderTop: `1px solid ${isDark ? '#2C2E33' : '#e9ecef'}`,
        backgroundColor: isDark ? '#0A0A0B' : '#F6F6F7'
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Text size="sm" c="dimmed">
            {currentYear}. Jack Ragless. 
          </Text>
          <Group gap="md">
            {profile?.githubUrl && (
              <Anchor href={profile.githubUrl} target="_blank" c="dimmed" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <IconBrandGithub size={18} />
                GitHub
              </Anchor>
            )}
            {profile?.linkedinUrl && (
              <Anchor href={profile.linkedinUrl} target="_blank" c="dimmed" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <IconBrandLinkedin size={18} />
                LinkedIn
              </Anchor>
            )}
            {profile?.discordUrl && (
              <Anchor href={profile.discordUrl} target="_blank" c="dimmed" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <IconBrandDiscord size={18} />
                Discord
              </Anchor>
            )}
          </Group>
        </Group>
      </Container>
    </Box>
  );
};

export default Footer;
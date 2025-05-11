import React from 'react';
import { Container, Text, Group, Anchor, Box } from '@mantine/core';
import { useComputedColorScheme } from '@mantine/core';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const computedColorScheme = useComputedColorScheme();
  const isDark = computedColorScheme === 'dark';
  
  return (
    <Box
      component="footer"
      py="md"
      style={{
        borderTop: `1px solid ${isDark ? '#2C2E33' : '#e9ecef'}`,
        backgroundColor: isDark ? '#1A1B1E' : 'white'
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Text size="sm" c="dimmed">
            © {currentYear} Portfolio. All rights reserved.
          </Text>
          <Group gap="xs">
            <Anchor href="https://github.com" target="_blank" c="dimmed" size="sm">
              GitHub
            </Anchor>
            <Anchor href="https://linkedin.com" target="_blank" c="dimmed" size="sm">
              LinkedIn
            </Anchor>
            <Anchor href="https://twitter.com" target="_blank" c="dimmed" size="sm">
              Twitter
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};

export default Footer;
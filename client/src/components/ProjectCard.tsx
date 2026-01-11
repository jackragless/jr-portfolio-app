import React from 'react';
import { Card, Image, Text, Group, Button, Stack, ScrollArea, useMantineColorScheme } from '@mantine/core';
import TechnologyBadge from './TechnologyBadge';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  projectUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  technologies,
  githubUrl,
  projectUrl
}) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // Process the imageUrl to correctly handle project images
  const resolvedImageSrc = React.useMemo(() => {
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http')) {
      // For external URLs, use as is
      return imageUrl;
    } else {
      // For local paths in assets folder, try to import them
      try {
        // Extract the file name from the path
        const fileName = imageUrl.split('/').pop();
        if (!fileName) return null;
        
        // Import from projects folder
        return require(`../assets/projects/${fileName}`);
      } catch (error) {
        console.error(`Error importing image for ${title}:`, error);
        return null;
      }
    }
  }, [imageUrl, title]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h={480} style={{ backgroundColor: isDark ? '#0A0A0B' : '#F6F6F7' }}>
      {resolvedImageSrc && (
        <Card.Section>
          <Image
            src={resolvedImageSrc}
            height={180}
            alt={title}
            fit="cover"
            radius="md"
            fallbackSrc="https://placehold.co/400x200?text=Project+Image"
          />
        </Card.Section>
      )}

      <Stack mt="md" mb="xs" style={{ height: 'calc(100% - 240px)' }}>
        <Text fw={500} size="lg">{title}</Text>
        
        {/* Technology badges with no scrolling, placed above description */}
        <Group style={{ flexWrap: 'wrap', gap: '8px' }}>
          {technologies.map((tech, index) => (
            <TechnologyBadge 
              key={index} 
              name={tech} 
            />
          ))}
        </Group>
        
        {/* Description with scrolling that only shows on hover */}
        <ScrollArea h={150} offsetScrollbars type="auto" scrollbarSize={6} scrollHideDelay={0}>
          <Text size="sm" c="dimmed" style={{ lineHeight: 1.5 }}>
            {description}
          </Text>
        </ScrollArea>
      </Stack>

      <Group mt="md" gap="xs">
        {githubUrl && (
          <Button 
            component="a" 
            href={githubUrl} 
            target="_blank" 
            variant="filled"
            color="blue"
            size="sm"
            style={{ flex: 1 }}
          >
            GitHub
          </Button>
        )}
        {projectUrl && (
          <Button 
            component="a" 
            href={projectUrl} 
            target="_blank" 
            variant="outline"
            color="blue"
            size="sm"
            style={{ flex: 1 }}
          >
            Live Demo
          </Button>
        )}
      </Group>
    </Card>
  );
};

export default ProjectCard;
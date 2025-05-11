import React from 'react';
import { Card, Image, Text, Group, Button, Stack, ScrollArea } from '@mantine/core';
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
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h={450}>
      {imageUrl && (
        <Card.Section>
          <Image
            src={imageUrl}
            height={180}
            alt={title}
            fit="cover"
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
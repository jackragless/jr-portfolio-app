import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  Box,
  SimpleGrid,
  Group,
  Button,
  Divider,
  Tooltip,
} from "@mantine/core";
import * as TablerIcons from "@tabler/icons-react";
import ProjectCard from "../components/ProjectCard";
import TechnologyBadge from "../components/TechnologyBadge";
import {
  Project,
  Profile,
  Experience,
  Education,
  Technology,
} from "../services/api";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import CSS for effects

// Section refs for scrolling
interface SectionRefs {
  about: React.RefObject<HTMLDivElement | null>;
  technologies: React.RefObject<HTMLDivElement | null>;
  projects: React.RefObject<HTMLDivElement | null>;
}

interface MainPageProps {
  sectionRefs: SectionRefs;
  profile?: Profile;
  projects: Project[]; // Added projects
  experiences: Experience[]; // Added experiences
  education: Education[]; // Added education
  technologies: Technology[]; // Added technologies
  allDataLoaded: boolean; // Added allDataLoaded
}

// About Section Content
const AboutSection: React.FC<{
  innerRef: React.RefObject<HTMLDivElement | null>;
  profile?: Profile;
  experiences?: Experience[];
  education?: Education[];
}> = ({ innerRef, profile, experiences, education }) => {
  if (!profile) {
    return null;
  }

  return (
    <Box ref={innerRef} py={80} id="about">
      <Container size="lg">
        <Title order={2} size="h1" mb="xl" ta="left">
          About Me.
        </Title>
        <Text size="lg" mb="xl" style={{ whiteSpace: "pre-line" }}>
          {profile.bioExtended || profile.bio}
        </Text>

        <Divider my="xl" />

        <Stack gap="md">
          <Title order={3} ta="left">Experience.</Title>
          {experiences && experiences.length > 0 ? (
            experiences.map((exp) => (
              <Box key={exp.id} mb="md">
                <Text size="lg" fw={700}>
                  {exp.position}
                </Text>
                <Text size="md" c="dimmed">
                  {exp.company} • {exp.period}
                </Text>
                <Text mt="xs">{exp.description}</Text>
              </Box>
            ))
          ) : (
            <Text>No experience data available.</Text>
          )}
        </Stack>

        <Divider my="xl" />

        <Stack gap="md">
          <Title order={3} ta="left">Education.</Title>
          {education && education.length > 0 ? (
            education.map((edu) => (
              <Box key={edu.id}>
                <Text size="lg" fw={700}>
                  {edu.degree}
                </Text>
                <Text size="md" c="dimmed">
                  {edu.institution} • {edu.period}
                </Text>
                <Text mt="xs">{edu.description}</Text>
              </Box>
            ))
          ) : (
            <Text>No education data available.</Text>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

// Technologies Section Content
const TechnologiesSection: React.FC<{
  innerRef: React.RefObject<HTMLDivElement | null>;
  technologies?: Technology[];
}> = ({ innerRef, technologies }) => {
  return (
    <Box ref={innerRef} py={80} id="technologies">
      <Container size="lg">
        <Title order={2} size="h1" mb="xl" ta="left">
          Technologies I Use.
        </Title>

        {technologies && technologies.length > 0 ? (
          <Box style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {technologies.map((tech) => (
              <TechnologyBadge
                key={tech.id}
                name={tech.name}
                icon={tech.icon}
                imageUrl={tech.imageUrl}
                url={tech.url}
              />
            ))}
          </Box>
        ) : (
          <Text size="lg" ta="center">
            No technologies data available.
          </Text>
        )}
      </Container>
    </Box>
  );
};

// Projects Section Content
const ProjectsSection: React.FC<{
  innerRef: React.RefObject<HTMLDivElement | null>;
  projects: Project[];
}> = ({ innerRef, projects }) => {
  return (
    <Box ref={innerRef} py={80} id="projects">
      <Container size="lg">
        <Title order={2} size="h1" mb="xl" ta="left">
          My Projects.
        </Title>

        {projects.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                projectUrl={project.projectUrl}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text size="lg" ta="center">
            No projects data available.
          </Text>
        )}
      </Container>
    </Box>
  );
};

// Hero Section
const HeroSection: React.FC<{ profile?: Profile }> = ({ profile }) => {
  const [copied, setCopied] = React.useState(false);
  
  const copyEmailToClipboard = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  if (!profile) {
    return null; 
  }

  return (
    <Box py={50}>
      <Container size="lg">
        <div style={{ display: "flex", flexDirection: "row", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Left-hand side: Profile information */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <Title order={1} size="3rem">
              {profile.name}
            </Title>
            <Text size="xl" mt="md" mb="md" c="dimmed">
              {profile.title}
            </Text>
            
            {profile.location && (
              <Group mb="md" align="center">
                <a 
                  href={profile.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '18px' }}>📍</span>
                  <Text>{profile.location}</Text>
                </a>
              </Group>
            )}

            <Text size="md" mb="xl">
              {profile.bio}
            </Text>
            
            <Group gap="md" style={{ position: "relative" }}>
              {profile.githubUrl && (
                <Button
                  component="a"
                  href={profile.githubUrl}
                  target="_blank"
                  variant="outline"
                  leftSection={<TablerIcons.IconBrandGithub size={18} />}
                >
                  GitHub
                </Button>
              )}
              {profile.linkedinUrl && (
                <Button
                  component="a"
                  href={profile.linkedinUrl}
                  target="_blank"
                  variant="outline"
                  leftSection={<TablerIcons.IconBrandLinkedin size={18} />}
                >
                  LinkedIn
                </Button>
              )}
              {profile.discordUrl && (
                <Button
                  component="a"
                  href={profile.discordUrl}
                  target="_blank"
                  variant="outline"
                  leftSection={<TablerIcons.IconBrandDiscord size={18} />}
                >
                  Discord
                </Button>
              )}
              {profile.email && (
                <Tooltip label={profile.email} withArrow>
                  <Button
                    onClick={() => profile.email && copyEmailToClipboard(profile.email)}
                    variant="filled"
                    style={{ 
                      minWidth: "120px",  // Set a fixed minimum width for the button
                      transition: "all 0.2s ease"
                    }}
                    leftSection={
                      copied ? (
                        <TablerIcons.IconCheck size={18} style={{ 
                          animation: "pulse 0.5s ease-in-out" 
                        }} />
                      ) : (
                        <TablerIcons.IconMail size={18} />
                      )
                    }
                  >
                    {copied ? "Copied!" : "Email"}
                  </Button>
                </Tooltip>
              )}
              
              {/* Hidden notification that provides visual feedback */}
              {copied && (
                <style>
                  {`
                    @keyframes pulse {
                      0% { transform: scale(1); }
                      50% { transform: scale(1.3); }
                      100% { transform: scale(1); }
                    }
                  `}
                </style>
              )}
            </Group>
          </div>
          
          {/* Right-hand side: Portrait image */}
          <div style={{ 
            flex: "0 0 auto", 
            maxWidth: "350px",
            width: "300px", // Changed from 100% to fixed width
            height: "300px", // Added fixed height for placeholder
            display: "flex",
            justifyContent: "center",
            alignItems: "center" // Added for vertical centering
          }}>
            <LazyLoadImage
              alt="Jack Ragless"
              effect="blur"
              src={require("../assets/portrait.png")} // your image source
              style={{ 
                display: "block", // Added display: block
                maxWidth: "100%",
                maxHeight: "100%", // Added maxHeight
                width: "auto", // Added width: auto
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
              }}
              placeholderSrc={require("../assets/portrait_compressed.png")} // optional placeholder image
            />
          </div>
        </div>
      </Container>
    </Box>
  );
};

// Main Page Component
const MainPage: React.FC<MainPageProps> = ({ 
  sectionRefs, 
  profile, 
  projects, 
  experiences, 
  education, 
  technologies, 
  allDataLoaded 
}) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (allDataLoaded) {
      // Timeout to allow the content to be in the DOM before triggering the animation
      const timer = setTimeout(() => {
        setFadeIn(true);
      }, 100); // Small delay
      return () => clearTimeout(timer);
    }
  }, [allDataLoaded]);

  return (
    <>
      {/* Progress bar is now in App.tsx */}
      {allDataLoaded ? (
        <div className={fadeIn ? "fade-in" : "content-hidden-for-fade"}>
          <HeroSection profile={profile} />
          <AboutSection 
            innerRef={sectionRefs.about} 
            profile={profile} 
            experiences={experiences} 
            education={education} 
          />
          <TechnologiesSection 
            innerRef={sectionRefs.technologies} 
            technologies={technologies} 
          />
          <ProjectsSection 
            innerRef={sectionRefs.projects} 
            projects={projects} 
          />
        </div>
      ) : (
        // Content is hidden by App.tsx until allDataLoaded is true
        // This container can be removed or used for a more specific MainPage loading indicator if needed
        <Container style={{ textAlign: 'center', paddingTop: '20vh' }}>
          {/* Optional: Add a loading spinner or message specific to MainPage if desired */}
        </Container>
      )}
    </>
  );
};

export default MainPage;

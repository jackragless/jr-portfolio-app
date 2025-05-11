import React, { useState } from "react";
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
  ProjectService,
  Project,
  ProfileService,
  Profile,
  ExperienceService,
  Experience,
  EducationService,
  Education,
  TechnologyService,
  Technology,
} from "../services/api";

// Import project images
import architecturePortfolioApp from "../assets/projects/architecture_portfolio_app.png";
import auscyclingTimeTrialApp from "../assets/projects/auscycling_time_trial_app.png";
import bitcoinDashboard from "../assets/projects/bitcoin_dashboard.png";
import chess from "../assets/projects/chess.png";
import dissectingTheNeedleDrop from "../assets/projects/dissecting_the_needle_drop.gif";
import glotex from "../assets/projects/glotex.png";

// Map image names to their imported references
const projectImages: Record<string, string> = {
  "architecture_portfolio_app.png": architecturePortfolioApp,
  "auscycling_time_trial_app.png": auscyclingTimeTrialApp,
  "bitcoin_dashboard.png": bitcoinDashboard,
  "chess.png": chess,
  "dissecting_the_needle_drop.gif": dissectingTheNeedleDrop,
  "glotex.png": glotex,
};

// Helper function to get the correct image path
const getProjectImagePath = (imageUrl?: string): string | undefined => {
  if (!imageUrl) return undefined;
  
  // If it's a full URL (starts with http), use it directly
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // Extract the filename from the path (in case it includes directories)
  const filename = imageUrl.split('/').pop();
  
  // Return the imported image reference if available
  if (filename && projectImages[filename]) {
    return projectImages[filename];
  }
  
  // If we can't resolve it, return the original path and let the fallback handle it
  return imageUrl;
};



// Section refs for scrolling
interface SectionRefs {
  about: React.RefObject<HTMLDivElement | null>;
  technologies: React.RefObject<HTMLDivElement | null>;
  projects: React.RefObject<HTMLDivElement | null>;
}

interface MainPageProps {
  sectionRefs: SectionRefs;
}

// About Section Content
const AboutSection: React.FC<{
  innerRef: React.RefObject<HTMLDivElement | null>;
  profile?: Profile;
  experiences?: Experience[];
  education?: Education[];
}> = ({ innerRef, profile, experiences, education }) => {
  if (!profile) {
    return (
      <Box ref={innerRef} py={80} id="about">
        <Container size="lg">
          <Text size="lg" ta="center">
            Loading about me...
          </Text>
        </Container>
      </Box>
    );
  }

  return (
    <Box ref={innerRef} py={80} id="about">
      <Title order={2} size="h1" mb="xl" ta="center">
        About Me
      </Title>
      <Container size="lg">
        <Stack gap="md">
          <Title order={3}>Experience</Title>
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
            <Text>Loading experience...</Text>
          )}
        </Stack>

        <Divider my="xl" />

        <Stack gap="md">
          <Title order={3}>Education</Title>
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
            <Text>Loading education...</Text>
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
        <Title order={2} size="h1" mb="xl" ta="center">
          Technologies I Use
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
            Loading technologies...
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
        <Title order={2} size="h1" mb="xl" ta="center">
          My Projects
        </Title>

        {projects.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                imageUrl={getProjectImagePath(project.imageUrl)}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                projectUrl={project.projectUrl}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text size="lg" ta="center">
            Loading projects...
          </Text>
        )}
      </Container>
    </Box>
  );
};

// Hero Section
const HeroSection: React.FC<{ profile?: Profile }> = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  
  const copyEmailToClipboard = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  if (!profile) {
    return (
      <Box py={100} style={{ textAlign: "center" }}>
        <Container size="lg">
          <Text size="lg">Loading profile...</Text>
        </Container>
      </Box>
    );
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
                  href={profile.locationUrl || "https://www.google.com.au/maps/place/Your+mum's+house/@-33.7673436,151.0473728,17z/data=!3m1!4b1!4m6!3m5!1s0x6b12a500725954a5:0xad083c3688295d78!8m2!3d-33.7673436!4d151.0499477!16s%2Fg%2F11x5tkkmkh?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D"}
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
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}>
            <img 
              src={require("../assets/portrait.png")} 
              alt="Jack Ragless"
              style={{ 
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
              }}
            />
          </div>
        </div>
      </Container>
    </Box>
  );
};

// Main Page Component
const MainPage: React.FC<MainPageProps> = ({ sectionRefs }) => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [profile, setProfile] = React.useState<Profile | undefined>(undefined);
  const [experiences, setExperiences] = React.useState<Experience[]>([]);
  const [education, setEducation] = React.useState<Education[]>([]);
  const [technologies, setTechnologies] = React.useState<Technology[]>([]);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchProfile = async () => {
      try {
        const data = await ProfileService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchExperiences = async () => {
      try {
        const data = await ExperienceService.getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    const fetchEducation = async () => {
      try {
        const data = await EducationService.getEducation();
        setEducation(data);
      } catch (error) {
        console.error("Error fetching education:", error);
      }
    };

    const fetchTechnologies = async () => {
      try {
        const data = await TechnologyService.getTechnologies();
        setTechnologies(data);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };

    fetchProjects();
    fetchProfile();
    fetchExperiences();
    fetchEducation();
    fetchTechnologies();
  }, []);

  return (
    <Stack gap={0}>
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
      <ProjectsSection innerRef={sectionRefs.projects} projects={projects} />
    </Stack>
  );
};

export default MainPage;

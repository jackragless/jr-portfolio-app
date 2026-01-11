import 'reflect-metadata';
import { AppDataSource, initializeDatabase } from '../src/config/database';
import { Project } from '../src/models/Project';
import { Profile } from '../src/models/Profile';
import { Experience } from '../src/models/Experience';
import { Education } from '../src/models/Education';
import { Technology } from '../src/models/Technology';

/**
 * Seed script to populate the database with data
 */
async function seedDatabase() {
  console.log('Starting database seeding...');
  
  try {
    // Initialize the database connection
    await initializeDatabase();
    console.log('Database connected successfully');
    
    // Clear existing data
    await AppDataSource.getRepository(Project).clear();
    await AppDataSource.getRepository(Profile).clear();
    await AppDataSource.getRepository(Experience).clear();
    await AppDataSource.getRepository(Education).clear();
    await AppDataSource.getRepository(Technology).clear();
    console.log('Cleared existing data');
    
    // --------- Seed Profile data ---------
    const profileData = {
      name: "Jack Ragless",
      title: "Full Stack Software Engineer | Previous Data Science Experience",
      bio: "Jack of all trades (excuse the pun). For me, software engineering isn’t a medium to display technical prowess. It’s the distillation of client needs into impactful products and features.",
      bioExtended: `My path to computer science was a winding one. My interests in economics led me to data science projects, which turned into a passion for software development. 
While studying my Bachelors, I undertook government research in Natural Language Processing (machine learning). 
I now develop data insights software for some of the world’s largest retailers, drinking daily from the firehose of full-stack development.
`,
      githubUrl: "https://github.com/jackragless",
      linkedinUrl: "https://www.linkedin.com/in/jack-ragless/",
      discordUrl: "https://discord.com/users/jackragless",
      resumeUrl: "https://drive.google.com/uc?export=download&id=1RmiNf4rGgZFrl_hZvbrYUNwVnezpeJHP",
      location: "Melbourne, Australia",
      locationUrl: "https://www.google.com/maps/place/Melbourne+VIC/@-37.9696356,144.392389,9z/data=!3m1!4b1!4m6!3m5!1s0x6ad646b5d2ba4df7:0x4045675218ccd90!8m2!3d-37.8136276!4d144.9630576!16zL20vMGNoZ3pt?hl=en&entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D",
      email: "jackdragless@gmail.com"
    };
    
    const profile = new Profile();
    Object.assign(profile, profileData);
    await AppDataSource.getRepository(Profile).save(profile);
    console.log('Profile data seeded');
    
    // --------- Seed Experience data ---------
    const experienceData = [
      {
        position: "Software Engineer",
        company: "Quantium",
        period: "2023 – Present",
        description: "Full-stack developer building Q.Checkout from scratch, Quantium's core retail data platform. Q.Checkout transforms transaction data from 10M+ Woolworths customers into behavioural and product performance insights for suppliers. We have since expanded globally, adapting the platform for Dollar General and Asda.\n\nTypes of day-to-day work include:\n\n- Frontend React work on the eye candy and data visualisations\n- Developing .Net microservices for complex backend data transformation\n- Implementing automated monitoring and alerting for faster incidence response times\n- Creating custom workflows for our CI/CD pipeline to improve release process",
        order: 1
      },
      {
        position: "Machine Learning Researcher",
        company: "Defence Science Technology Group",
        period: "2021 – 2022",
        description: "While studying Bachelors, received Stage 1 & 2 research funding as part of Artificial Intelligence for Decision-Making Initiative. Developed machine learning model (named “GloTex”) to generate glossaries for defence documents. Presented academic findings to DST judge panel. At time of research, GloTex’s keyphrase extraction outperformed leading models in 85% of documents sampled.",
        order: 2
      },
      {
        position: "Data Science Intern",
        company: "Deloitte",
        period: "2020",
        description: "Consulted with Land Services SA to design a data commercialisation strategy as part of the Deloitte Vacationer Challenge, performing exploratory data analysis to identify high-value features within underutilised datasets and quantify their correlation with residential property market valuations. Engineered an ETL pipeline for Deloitte Access Economics, programmatically scraping, cleaning, and structuring over ten years of industry award wage data (~800K datapoints) to enable downstream economic modelling.",
        order: 3
      }
    ];
    
    for (const expData of experienceData) {
      const experience = new Experience();
      Object.assign(experience, expData);
      await AppDataSource.getRepository(Experience).save(experience);
    }
    console.log('Experience data seeded');
    
    // --------- Seed Education data ---------
    const educationData = [
      {
        degree: "Bachelor of Computer Science & Bachelor of Finance",
        institution: "The University of Adelaide",
        period: "2022",
        description: "Double degree. Majored in Artificial Intelligence.",
        order: 1
      },
      {
        degree: "Exchange Program",
        institution: "Fudan University",
        description: "Studied abroad in Shanghai, China as part of New Colombo Plan.",
        order: 2
      }
    ];
    
    for (const eduData of educationData) {
      const education = new Education();
      Object.assign(education, eduData);
      await AppDataSource.getRepository(Education).save(education);
    }
    console.log('Education data seeded');
    
    // --------- Seed Technology data ---------
    const technologyData = [
      { name: ".NET", order: 1, icon: "IconBrandMicrosoft", imageUrl: "../assets/technologies/dotnet.png", url: "https://dotnet.microsoft.com/" },
      { name: "AWS", order: 2, icon: "IconBrandAws", imageUrl: "../assets/technologies/aws.png", url: "https://aws.amazon.com/" },
      { name: "Azure", order: 3, icon: "IconBrandAzure", imageUrl: "../assets/technologies/azure.png", url: "https://azure.microsoft.com/" },
      { name: "Bash", order: 4, icon: "IconTerminal2", imageUrl: "../assets/technologies/bash.png", url: "https://www.gnu.org/software/bash/" },
      { name: "C++", order: 5, icon: "IconBrandCpp", imageUrl: "../assets/technologies/cpp.png", url: "https://isocpp.org/" },
      { name: "Claude Code", order: 6, icon: "IconRobot", imageUrl: "../assets/technologies/claude.png", url: "https://claude.ai/" },
      { name: "Copilot", order: 7, icon: "IconBrandGithub", imageUrl: "../assets/technologies/copilot.png", url: "https://github.com/features/copilot" },
      { name: "CSS", order: 8, icon: "IconBrandCss3", imageUrl: "../assets/technologies/css.png", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "DataDog", order: 9, icon: "IconBrandDatadog", imageUrl: "../assets/technologies/datadog.png", url: "https://www.datadoghq.com/" },
      { name: "Docker", order: 10, icon: "IconBrandDocker", imageUrl: "../assets/technologies/docker.png", url: "https://www.docker.com/" },
      { name: "Git", order: 11, icon: "IconBrandGit", imageUrl: "../assets/technologies/git.ico", url: "https://git-scm.com/" },
      { name: "GitHub Actions", order: 12, icon: "IconBrandGithub", imageUrl: "../assets/technologies/github-actions.png", url: "https://github.com/features/actions" },
      { name: "HTML", order: 13, icon: "IconBrandHtml5", imageUrl: "../assets/technologies/html.png", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "JavaScript", order: 14, icon: "IconBrandJavascript", imageUrl: "../assets/technologies/javascript.png", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Jira", order: 15, icon: "IconBrandJira", imageUrl: "../assets/technologies/jira.ico", url: "https://www.atlassian.com/software/jira" },
      { name: "Kubernetes", order: 16, icon: "IconBrandKubernetes", imageUrl: "../assets/technologies/kubernetes.png", url: "https://kubernetes.io/" },
      { name: "Node JS", order: 17, icon: "IconBrandNodejs", imageUrl: "../assets/technologies/nodejs.png", url: "https://nodejs.org/" },
      { name: "Python", order: 18, icon: "IconBrandPython", imageUrl: "../assets/technologies/python.png", url: "https://www.python.org/" },
      { name: "React", order: 19, icon: "IconBrandReact", imageUrl: "../assets/technologies/react.ico", url: "https://reactjs.org/" },
      { name: "Redux", order: 20, icon: "IconBrandRedux", imageUrl: "../assets/technologies/redux.png", url: "https://redux.js.org/" },
      { name: "SQL", order: 21, icon: "IconDatabase", imageUrl: "../assets/technologies/sql.png", url: "https://www.w3schools.com/sql/" },
      { name: "TypeScript", order: 22, icon: "IconBrandTypescript", imageUrl: "../assets/technologies/typescript.png", url: "https://www.typescriptlang.org/" }
    ];
    
    for (const techData of technologyData) {
      const technology = new Technology();
      Object.assign(technology, techData);
      await AppDataSource.getRepository(Technology).save(technology);
    }
    console.log('Technology data seeded');
    
    // --------- Seed Project data ---------
    const projects = [
      {
        title: 'AusCycling Time Trial App',
        description: 'Webapp project to calculate optimal race strategy in an Olympic Cycling Individual Time Trial. Developed for AusCycling. User uploads GPX, rider, bike & environment data, then recommended power output is calculated to minimize race duration.',
        technologies: ['React', 'JavaScript', 'Python', 'Firebase', 'HighCharts', 'Express'],
        imageUrl: '/assets/projects/auscycling_time_trial_app.png', // Updated path format
        projectUrl: '',
        githubUrl: 'https://github.com/jackragless/auscycling-time-trial-app',
        featured: true
      },
      {
        title: 'Architecture Portfolio App',
        description: 'My first React webapp! Architecture portfolio developed for a fellow university student. The application showcases architectural projects with responsive design and smooth navigation to highlight the visual work effectively.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Bootstrap'],
        imageUrl: '/assets/projects/architecture_portfolio_app.png', // Updated path format
        projectUrl: '',
        githubUrl: 'https://github.com/jackragless/architecture-portfolio-app',
        featured: true
      },
      {
        title: 'Dissecting The Needle Drop',
        description: 'Scraping, analyzing, and visualizing 2000+ reviews from YouTube music critic "The Needle Drop". This project examines which variables predict a review\'s score, including country of origin, musical genre, and artist popularity, to uncover patterns in music criticism.',
        technologies: ['Python', 'Pandas', 'Data Analysis'],
        imageUrl: '/assets/projects/dissecting_the_needle_drop.gif', // Updated path format
        projectUrl: '',
        githubUrl: 'https://github.com/jackragless/dissecting-the-needle-drop',
        featured: false
      },
      {
        title: 'GloTex: Glossary Term Extractor',
        description: 'Trained Transformer neural network to identify keyphrases in text. These keyphrases are then assigned a corresponding definition from Wiktionary using semantic similarity prediction. GloTex features a Django webapp for ease of use. These glossaries assist academics and government analysts reading esoteric documentation.',
        technologies: ['Python', 'Machine Learning', 'NLP', 'Django'],
        imageUrl: '/assets/projects/glotex.png', // Updated path format
        projectUrl: '',
        githubUrl: 'https://github.com/jackragless/GloTex-Glossary-Term-Extractor',
        featured: true
      },
      {
        title: 'Bitcoin Correlation Dashboard',
        description: 'Dashboard showing correlation between Bitcoin and traditional financial instruments. This was my first project using Python for data analysis. The analysis showed increasing correlation between Bitcoin and safe-haven assets as confidence in cryptocurrencies grew over time, providing insights for investment strategies.',
        technologies: ['Python', 'Jupyter', 'Data Visualization'],
        imageUrl: '/assets/projects/bitcoin_dashboard.png', // Updated path format
        projectUrl: '',
        githubUrl: 'https://github.com/jackragless/bitcoin-correlation-dashboard',
        featured: true
      },
      {
        title: 'Terminal Chess',
        description: 'Play chess from the comfort of your bash terminal. This game was developed as part of my Object Oriented Programming course at University of Adelaide. The application implements all chess rules including special moves like castling and en passant, with an intuitive terminal-based interface.',
        technologies: ['C++', 'OOP'],
        imageUrl: '/assets/projects/chess.png', // Updated path format
        projectUrl: '',
        githubUrl: 'https://github.com/jackragless/terminal-chess',
        featured: false
      }
    ];
    
    // Insert projects into database
    for (const projectData of projects) {
      const project = new Project();
      Object.assign(project, projectData);
      await AppDataSource.getRepository(Project).save(project);
    }
    
    console.log(`Successfully seeded database with ${projects.length} projects`);
    
    // Close database connection
    await AppDataSource.destroy();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('Database seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database seeding failed:', error);
    process.exit(1);
  });
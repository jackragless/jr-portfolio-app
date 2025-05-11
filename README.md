# Portfolio Web Application

A modern portfolio web application built with React, Node.js, Mantine UI, and MongoDB.

## Features

- **Responsive Design**: Works on all device sizes
- **Modern UI**: Built with Mantine UI components
- **Portfolio Projects**: Showcase your work with detailed project pages
- **About Page**: Share your skills, experience, and education
- **Contact Form**: Allow visitors to get in touch

## Tech Stack

### Frontend
- React with TypeScript
- Mantine UI framework
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- RESTful API architecture
- TypeScript for type safety

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd portfolio-app
```

2. Install dependencies for both frontend and backend
```
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
Create a `.env` file in the server directory with the following variables:
```
PORT=8000
MONGO_URI=mongodb://localhost:27017/portfolio_db
NODE_ENV=development
```

### Running the Application

1. Start the backend server
```
cd server
npm run dev
```

2. Start the frontend development server
```
cd client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
portfolio-app/
├── client/               # React frontend
│   ├── public/           # Static assets
│   └── src/
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       └── services/     # API services
│
└── server/               # Node.js backend
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Database models
    │   └── routes/       # API routes
    └── .env              # Environment variables
```

## Deployment

### Backend
The backend can be deployed to platforms like Heroku, DigitalOcean, or AWS.

### Frontend
The React frontend can be deployed to platforms like Netlify, Vercel, or GitHub Pages.

## Customization

- Update personal information in the About component
- Add your own projects through the API
- Customize the theme colors in the Mantine provider
- Add additional pages or features as needed

## License

This project is licensed under the MIT License.
#!/bin/bash

echo "🚀 Preparing to deploy portfolio app to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Make sure all dependencies are installed
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🏗️ Building the application..."
CI=false npm run build

# Ensure database is properly included
echo "🗄️ Checking database file..."
if [ ! -f ./server/data/portfolio.sqlite ]; then
    echo "⚠️ Warning: Database file not found! Make sure to seed your database before deploying."
    read -p "Do you want to run the database seed script? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🌱 Seeding database..."
        cd server && npm run seed && cd ..
    else
        echo "❌ Deployment aborted. Please ensure your database file exists before deploying."
        exit 1
    fi
fi

# Prompt for environment
read -p "Deploy to production? (y/n - No will deploy to preview) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Deploying to production..."
    vercel --prod
else
    echo "🔍 Deploying to preview environment..."
    vercel
fi

echo "✅ Deployment process completed!"
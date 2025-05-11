#!/bin/bash

# Directory to save favicons
SAVE_DIR="/Users/jackragless/Projects/jr-portfolio-app/client/src/assets/technologies"

# Create the directory if it doesn't exist
mkdir -p "$SAVE_DIR"

# Function to download favicon
download_favicon() {
  url=$1
  name=$2
  echo "Processing $name from $url"
  
  # Clean up any previously downloaded files for this technology
  rm -f "$SAVE_DIR/${name}".*
  
  # Extract domain from URL
  domain=$(echo $url | sed -e 's|^[^/]*//||' -e 's|/.*$||')
  
  # Download the HTML content
  html=$(curl -L -s "$url")
  
  # Try to find favicon from HTML metadata
  # Look for apple-touch-icon first (usually higher quality)
  favicon_url=$(echo "$html" | grep -o '<link[^>]*rel="apple-touch-icon[^"]*"[^>]*href="[^"]*"' | head -1 | grep -o 'href="[^"]*"' | sed 's/href="//;s/"$//')
  
  # If not found, try standard favicon link
  if [ -z "$favicon_url" ]; then
    favicon_url=$(echo "$html" | grep -o '<link[^>]*rel="[^"]*icon[^"]*"[^>]*href="[^"]*"' | head -1 | grep -o 'href="[^"]*"' | sed 's/href="//;s/"$//')
  fi
  
  # If still not found, try standard shortcut icon
  if [ -z "$favicon_url" ]; then
    favicon_url=$(echo "$html" | grep -o '<link[^>]*rel="shortcut icon"[^>]*href="[^"]*"' | head -1 | grep -o 'href="[^"]*"' | sed 's/href="//;s/"$//')
  fi
  
  # If we found a favicon URL in the HTML
  if [ -n "$favicon_url" ]; then
    # If favicon URL is relative, prepend domain
    if [[ $favicon_url != http* ]]; then
      if [[ $favicon_url == /* ]]; then
        favicon_url="https://$domain$favicon_url"
      else
        favicon_url="https://$domain/$favicon_url"
      fi
    fi
    
    # Get extension from URL
    ext=$(echo "$favicon_url" | grep -o '\.[a-zA-Z0-9]*$' | tr '[:upper:]' '[:lower:]')
    if [ -z "$ext" ]; then
      ext=".png"
    fi
    
    # Download the favicon
    curl -L -s -o "$SAVE_DIR/${name}${ext}" "$favicon_url" 2>/dev/null
    
    # Check if download was successful
    if [ -s "$SAVE_DIR/${name}${ext}" ]; then
      # Verify if it's an image file
      file_type=$(file -b "$SAVE_DIR/${name}${ext}")
      if [[ $file_type == *"image"* ]]; then
        echo "Successfully downloaded $name favicon from $favicon_url"
      else
        rm -f "$SAVE_DIR/${name}${ext}"
        echo "Downloaded file for $name is not a valid image"
      fi
    else
      rm -f "$SAVE_DIR/${name}${ext}"
      echo "Failed to download favicon for $name from HTML metadata"
    fi
  fi
  
  # If no valid favicon found from HTML, try direct favicon.ico
  if [ ! -f "$SAVE_DIR/${name}${ext}" ]; then
    curl -L -s -o "$SAVE_DIR/${name}.ico" "https://$domain/favicon.ico" 2>/dev/null
    
    # Check if it's a valid image file
    if [ -s "$SAVE_DIR/${name}.ico" ]; then
      file_type=$(file -b "$SAVE_DIR/${name}.ico")
      if [[ $file_type == *"icon"* || $file_type == *"image"* ]]; then
        echo "Successfully downloaded $name favicon from direct favicon.ico"
      else
        rm -f "$SAVE_DIR/${name}.ico"
        echo "Downloaded favicon.ico for $name is not a valid image"
      fi
    else
      rm -f "$SAVE_DIR/${name}.ico"
      echo "Failed to download favicon.ico for $name"
    fi
  fi
  
  # Alternative sources for specific technologies that might need special handling
  if [ ! -f "$SAVE_DIR/${name}${ext}" ] && [ ! -f "$SAVE_DIR/${name}.ico" ]; then
    case $name in
      "react")
        curl -L -s -o "$SAVE_DIR/${name}.png" "https://reactjs.org/favicon.png" 2>/dev/null
        ;;
      "nodejs")
        curl -L -s -o "$SAVE_DIR/${name}.png" "https://nodejs.org/static/images/logo.svg" 2>/dev/null
        ;;
      "javascript")
        curl -L -s -o "$SAVE_DIR/${name}.png" "https://developer.mozilla.org/favicon-48x48.png" 2>/dev/null
        ;;
      "html")
        curl -L -s -o "$SAVE_DIR/${name}.png" "https://developer.mozilla.org/favicon-48x48.png" 2>/dev/null
        ;;
      "css")
        curl -L -s -o "$SAVE_DIR/${name}.png" "https://developer.mozilla.org/favicon-48x48.png" 2>/dev/null
        ;;
      "redux")
        curl -L -s -o "$SAVE_DIR/${name}.png" "https://redux.js.org/img/redux.svg" 2>/dev/null
        ;;
      "bash")
        curl -L -s -o "$SAVE_DIR/${name}.png" "https://www.gnu.org/graphics/heckert_gnu.transp.small.png" 2>/dev/null
        ;;
      *)
        echo "No alternative source for $name"
        ;;
    esac
    
    if [ -s "$SAVE_DIR/${name}.png" ]; then
      file_type=$(file -b "$SAVE_DIR/${name}.png")
      if [[ $file_type == *"image"* ]]; then
        echo "Successfully downloaded $name favicon from alternative source"
      else
        rm -f "$SAVE_DIR/${name}.png"
        echo "Alternative download for $name is not a valid image"
      fi
    fi
  fi
  
  # If we still don't have a valid icon, try fetching from a favicon service as a last resort
  if [ ! -f "$SAVE_DIR/${name}${ext}" ] && [ ! -f "$SAVE_DIR/${name}.ico" ] && [ ! -f "$SAVE_DIR/${name}.png" ]; then
    curl -L -s -o "$SAVE_DIR/${name}.png" "https://www.google.com/s2/favicons?domain=$domain&sz=64" 2>/dev/null
    if [ -s "$SAVE_DIR/${name}.png" ]; then
      echo "Successfully downloaded $name favicon from Google favicon service"
    else
      rm -f "$SAVE_DIR/${name}.png"
      echo "Failed to download favicon for $name from all sources"
    fi
  fi
}

# Download favicons for each technology
download_favicon "https://dotnet.microsoft.com/" "dotnet"
download_favicon "https://aws.amazon.com/" "aws"
download_favicon "https://www.gnu.org/software/bash/" "bash"
download_favicon "https://isocpp.org/" "cpp"
download_favicon "https://github.com/features/copilot" "copilot"
download_favicon "https://developer.mozilla.org/en-US/docs/Web/CSS" "css"
download_favicon "https://www.docker.com/" "docker"
download_favicon "https://www.figma.com/" "figma"
download_favicon "https://cloud.google.com/" "gcp"
download_favicon "https://git-scm.com/" "git"
download_favicon "https://developer.mozilla.org/en-US/docs/Web/HTML" "html"
download_favicon "https://developer.mozilla.org/en-US/docs/Web/JavaScript" "javascript"
download_favicon "https://www.atlassian.com/software/jira" "jira"
download_favicon "https://kubernetes.io/" "kubernetes"
download_favicon "https://nodejs.org/" "nodejs"
download_favicon "https://www.python.org/" "python"
download_favicon "https://reactjs.org/" "react"
download_favicon "https://redux.js.org/" "redux"
download_favicon "https://www.w3schools.com/sql/" "sql"
download_favicon "https://www.typescriptlang.org/" "typescript"

echo "Favicon download process completed!"
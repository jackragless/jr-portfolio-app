import React from "react";
import { Box, Text, Tooltip } from "@mantine/core";
import * as TablerIcons from "@tabler/icons-react";

// Import technology icons dynamically
const importIcon = (iconName: string) => {
  try {
    // Get only the filename without path or extension
    const fileName = iconName.split('/').pop()?.split('.')[0];
    if (!fileName) return null;
    
    // Determine the file extension based on the iconName
    let extension = 'png';
    if (iconName.endsWith('.ico')) extension = 'ico';
    
    // Try to require the icon dynamically - this will only work during development
    return require(`../assets/technologies/${fileName}.${extension}`);
  } catch (error) {
    console.error(`Failed to import icon: ${iconName}`, error);
    return null;
  }
};

// Helper function to get an icon component by name
const getIconComponent = (iconName: string, size = 20) => {
  try {
    // Try to access the icon directly from TablerIcons
    const icon = TablerIcons[iconName as keyof typeof TablerIcons];

    // Check if it's a React component we can render
    if (icon && typeof icon === "function" && "render" in icon) {
      // It's likely a valid React component
      return React.createElement(icon as any, { size });
    }
  } catch (error) {
    console.error(`Error rendering icon ${iconName}:`, error);
  }

  // Fallback to a placeholder if icon not found or invalid
  return <TablerIcons.IconCode size={size} />;
};

interface TechnologyBadgeProps {
  name: string;
  icon?: string;
  imageUrl?: string;
  url?: string;
}

const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({
  name,
  icon,
  imageUrl,
  url,
}) => {
  const handleClick = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Process the imageUrl to correctly handle icon paths
  const resolvedIconSrc = React.useMemo(() => {
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
        
        // Derive the tech name from the file name (removing extension)
        const techName = fileName.split('.')[0].toLowerCase();
        
        // Import based on the tech name
        let iconPath;
        try {
          // Try to import the specific tech icon
          iconPath = require(`../assets/technologies/${fileName}`);
        } catch {
          // Fallback: try to find the icon by tech name
          iconPath = require(`../assets/technologies/${techName}.png`);
        }
        
        return iconPath;
      } catch (error) {
        console.error(`Error importing icon for ${name}:`, error);
        return null;
      }
    }
  }, [imageUrl, name]);

  return (
      <Box
        className="tech-box"
        style={{
          display: "flex",
          alignItems: "center",
          height: "34px",
          padding: "0 12px",
          borderRadius: "4px",
          border: "1px solid var(--mantine-color-gray-3)",
          backgroundColor: "var(--mantine-color-body)",
          gap: "8px",
          cursor: url ? "pointer" : "default",
          transition: "all 0.2s ease",
        }}
        onClick={handleClick}
      >
        {resolvedIconSrc ? (
          <img
            src={resolvedIconSrc}
            alt={name}
            style={{
              width: "20px",
              height: "20px",
              objectFit: "contain",
            }}
            onError={(e) => {
              console.error(`Failed to load image for ${name}`);
              // If image fails to load, fall back to icon
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : icon ? (
          getIconComponent(icon)
        ) : null}
        <Text size="sm" fw={500}>
          {name}
        </Text>
      </Box>
  );
};

export default TechnologyBadge;
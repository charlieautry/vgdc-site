export interface Resource {
  title: string;
  description: string;
  type: 'link' | 'youtube' | 'download';
  url: string; // For links and downloads, this is the URL. For YouTube, this is the video ID
  category: string;
  tags: string[];
}

export const resources: Resource[] = [
  {
    title: "Godot Engine Documentation",
    description: "Official documentation for the Godot game engine. Learn everything from basics to advanced features.",
    type: "link",
    url: "https://docs.godotengine.org/",
    category: "Documentation",
    tags: ["godot", "engine", "documentation"]
  },
  {
    title: "Unity Learn Platform",
    description: "Free tutorials and courses for Unity development, from beginner to advanced.",
    type: "link",
    url: "https://learn.unity.com/",
    category: "Tutorial",
    tags: ["unity", "tutorial", "learning"]
  },
  {
    title: "Introduction to Game Development",
    description: "A comprehensive video introduction to game development concepts and best practices.",
    type: "youtube",
    url: "dQw4w9WgXcQ", // Replace with actual video ID
    category: "Tutorial",
    tags: ["beginner", "tutorial", "gamedev"]
  },
  {
    title: "Week 1 Godot Build",
    description: "Download the Godot project files from our first week meeting.",
    type: "download",
    url: "/downloads/week1-godot.zip",
    category: "Project Files",
    tags: ["godot", "project", "meeting"]
  }
];

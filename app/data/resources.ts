export interface Resource {
  title: string;
  description: string;
  type: 'link' | 'youtube' | 'download';
  url: string; // For links and downloads, this is the URL. For YouTube, this is the video ID
  category: string;
  tags: string[];
  image?: string; // Optional OpenGraph image URL
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
    title: "Godot Basics Youtube Tutorial",
    description: "A beginner-friendly video tutorial covering the basics of using the Godot engine for game development.",
    type: "youtube",
    url: "LOhfqjmasi0",
    category: "Tutorial",
    tags: ["godot", "tutorial", "beginner", "youtube"]
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
    url: "_eK26atXTds",
    category: "Tutorial",
    tags: ["beginner", "tutorial", "gamedev", "youtube"]
  },
  {
    title: "Aseprite",
    description: "Animated sprite editor and pixel art tool. Open source program for creating 2D animations and pixel art for games.",
    type: "link",
    url: "https://github.com/aseprite/aseprite",
    category: "Tool",
    tags: ["pixel art", "sprites", "animation", "2d", "art"]
  },
  {
    title: "Unity Movement Tutorial",
    description: "In-depth tutorial series on implementing movement mechanics in Unity. Learn advanced character controller techniques from Catlike Coding.",
    type: "link",
    url: "https://catlikecoding.com/unity/tutorials/movement/",
    category: "Tutorial",
    tags: ["unity", "movement", "character controller", "advanced", "tutorial"]
  },
  {
    title: "OSU VGDC Linktree",
    description: "Official OSU Video Game Development Club Linktree with links to all our social media, Discord, and important resources.",
    type: "link",
    url: "https://linktr.ee/OSU_VGDC?utm_source=linktree_profile_share&ltsid=79316a55-4b2e-4c20-8b33-d102f92847fe",
    category: "Community",
    tags: ["vgdc", "social media", "discord", "community", "links"]
  },
  {
    title: "Fab - Epic Games Marketplace",
    description: "Epic Games' unified marketplace for 3D content, game assets, plugins, and tools. Find high-quality assets for Unreal Engine and other game engines.",
    type: "link",
    url: "https://www.fab.com/",
    category: "Tool",
    tags: ["assets", "marketplace", "3d", "unreal", "plugins", "models"]
  },
  {
    title: "Mixamo",
    description: "Free 3D character animation library from Adobe. Get rigged characters and motion capture animations for your games.",
    type: "link",
    url: "https://www.mixamo.com/#/",
    category: "Tool",
    tags: ["animation", "3d", "characters", "rigging", "mocap", "free"]
  },
  {
    title: "OpenGameArt",
    description: "Community-driven collection of free game art assets including sprites, textures, music, and sound effects for game developers.",
    type: "link",
    url: "https://opengameart.org/",
    category: "Tool",
    tags: ["assets", "free", "2d", "3d", "sprites", "music", "sounds", "textures"]
  },
  {
    title: "MapMagic 2 - Unity Terrain Generator",
    description: "Powerful procedural terrain generation tool for Unity. Create infinite landscapes with nodes-based editor and advanced features.",
    type: "link",
    url: "https://assetstore.unity.com/packages/tools/terrain/mapmagic-2-165180",
    category: "Tool",
    tags: ["unity", "terrain", "procedural", "level design", "3d", "generation"]
  },
  {
    title: "Meshy AI",
    description: "AI-powered 3D model generation tool. Create 3D assets from text descriptions or images using artificial intelligence.",
    type: "link",
    url: "https://www.meshy.ai/",
    category: "Tool",
    tags: ["ai", "3d", "modeling", "generation", "assets", "procedural"]
  },
  {
    title: "Free Fantasy 200 SFX Pack",
    description: "Collection of 200+ free fantasy sound effects for game development. Includes spells, UI sounds, impacts, and more.",
    type: "link",
    url: "https://tommusic.itch.io/free-fantasy-200-sfx-pack",
    category: "Tool",
    tags: ["audio", "sound effects", "sfx", "free", "fantasy", "game audio"]
  },
  {
    title: "Brackeys YouTube Channel",
    description: "Popular game development YouTube channel with comprehensive Unity tutorials, game design tips, and programming guides for beginners and intermediate developers.",
    type: "link",
    url: "https://www.youtube.com/@Brackeys/featured",
    category: "Tutorial",
    tags: ["unity", "tutorial", "youtube", "beginner", "programming", "game design"]
  },
  {
    title: "How to Think Like a Game Designer",
    description: "Learn how to analyze game mechanics using the MDA framework. This video explores how mechanics influence player actions and feelings, demonstrating how to adapt borrowed elements to your own game design. Discover how to create a cohesive experience.",
    type: "youtube",
    url: "iIOIT3dCy5w",
    category: "Tutorial",
    tags: ["design", "mda", "tutorial", "beginner", "game design", "mechanics", "dynamics", "aesthetics", "youtube"]
  },
  {
    title: "GMTK YouTube Channel",
    description: "Game Maker's Toolkit - in-depth video essays analyzing game design, mechanics, and what makes games work. Features weekly videos on game design theory and analysis.",
    type: "link",
    url: "https://www.youtube.com/@GMTK",
    category: "Tutorial",
    tags: ["game design", "analysis", "youtube", "theory", "mechanics", "essay"]
  },
  {
    title: "How To Market A Game",
    description: "Website to learn how to effectively market your game, from social media strategies to press outreach.",
    type: "link",
    url: "https://howtomarketagame.com/",
    category: "Marketing",
    tags: ["marketing", "game development", "social media", "press outreach"]
  },
  {
    title: "GDC Vault",
    description: "Extensive library of game development talks, presentations, and panels from the Game Developers Conference. Learn from industry experts on a wide range of topics.",
    type: "link",
    url: "https://www.gdcvault.com/",
    category: "Tutorial",
    tags: ["gdc", "tutorial", "game development", "talks", "panels", "presentations"]
  }
];

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Last-commit time keeps "newest first" meaningful in CI, where a fresh
// checkout erases file mtimes. Untracked files (just added locally or just
// uploaded via the CMS before their first CI build) fall back to mtime.
const gitTimeMs = (filePath) => {
  try {
    const out = execSync(`git log -1 --format=%ct -- "${filePath}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out ? Number(out) * 1000 : null;
  } catch {
    return null;
  }
};

const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');
const outputFile = path.join(process.cwd(), 'app', 'data', 'gallery.ts');

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

try {
  // Create gallery directory if it doesn't exist
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
    console.log('Created gallery directory');
  }

  // Read all files in the gallery directory
  const files = fs.readdirSync(galleryDir);
  
  // Filter for image files only and get their stats
  const imageFilesWithStats = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    })
    .map(file => {
      const filePath = path.join(galleryDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        sortTime: gitTimeMs(filePath) ?? stats.mtime.getTime()
      };
    });

  // Sort newest first; tie-break by name for determinism within one commit
  imageFilesWithStats.sort(
    (a, b) => b.sortTime - a.sortTime || a.name.localeCompare(b.name)
  );

  // Generate the paths
  const imagePaths = imageFilesWithStats.map(file => `/images/gallery/${file.name}`);

  // Create the TypeScript file content
  const content = `// This file is auto-generated. Do not edit manually.
// Run 'npm run generate:gallery' to regenerate.

export const galleryImages: string[] = ${JSON.stringify(imagePaths, null, 2)};
`;

  // Write to file
  fs.writeFileSync(outputFile, content, 'utf8');
  console.log(`Generated gallery.ts with ${imagePaths.length} images`);
  
} catch (error) {
  console.error('Error generating gallery:', error);
  process.exit(1);
}

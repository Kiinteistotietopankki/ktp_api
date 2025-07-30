const fs = require('fs/promises');
const path = require('path');

async function cleanOldCacheFiles(cacheDir, maxAgeDays = 7) {
  const now = Date.now();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (err) {
      console.error(`Failed to read directory: ${dir}`, err);
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      try {
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else {
          const stat = await fs.stat(fullPath);
          const age = now - stat.mtimeMs;

          if (age > maxAgeMs) {
            await fs.unlink(fullPath);
            console.log(`Deleted old cached file: ${fullPath}`);
          }
        }
      } catch (err) {
        console.error(`Error processing file: ${fullPath}`, err);
      }
    }
  }

  await walk(cacheDir);
}

module.exports = cleanOldCacheFiles;
#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const blogDir = path.join(rootDir, 'content', 'blog');
const outDir = path.join(rootDir, 'public', 'content', 'blog');
const routesFilePath = path.join(rootDir, 'src', 'routes.txt');

// Ensure output directories exist
fs.mkdirSync(outDir, { recursive: true });

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: fileContent.trim() };
  }

  const rawYaml = match[1];
  const body = match[2].trim();
  const data = {};

  const lines = rawYaml.split(/\r?\n/);
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let val = line.slice(colonIndex + 1).trim();

    // Strip wrapping quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    // Parse booleans
    if (val === 'true') {
      data[key] = true;
    } else if (val === 'false') {
      data[key] = false;
    } else if (val.startsWith('[') && val.endsWith(']')) {
      // Parse simple inline arrays like ["Angular", "Signals"]
      try {
        data[key] = JSON.parse(val);
      } catch {
        data[key] = val
          .slice(1, -1)
          .split(',')
          .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
          .filter(Boolean);
      }
    } else {
      data[key] = val;
    }
  }

  return { data, content: body };
}

function calculateReadingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function run() {
  if (!fs.existsSync(blogDir)) {
    console.log('[build-blog-manifest] No content/blog directory found. Creating empty manifest.');
    fs.writeFileSync(path.join(outDir, 'posts.json'), JSON.stringify([], null, 2));
    return;
  }

  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const posts = [];

  for (const file of files) {
    const fullPath = path.join(blogDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data, content: body } = parseFrontmatter(content);

    const slug = data.slug || path.basename(file, '.md');
    const post = {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      author: data.author || 'Lead Developer',
      authorRole: data.authorRole || 'Contributor',
      authorAvatarUrl: data.authorAvatarUrl || '/images/tech/angular.svg',
      category: data.category || 'Architecture',
      tags: Array.isArray(data.tags) ? data.tags : ['Angular'],
      summary: data.summary || body.slice(0, 160).replace(/[#*`]/g, '').trim(),
      coverImage: data.coverImage || 'images/chintap-og.jpg',
      featured: Boolean(data.featured),
      readingTimeMinutes: calculateReadingTime(body),
      body,
    };

    posts.push(post);

    // Write individual post payload
    fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(post, null, 2));
  }

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Write posts index (with lighter payloads without huge body for listing speed)
  const listManifest = posts.map(({ body, ...meta }) => meta);
  fs.writeFileSync(path.join(outDir, 'posts.json'), JSON.stringify(listManifest, null, 2));

  console.log(`[build-blog-manifest] Successfully compiled ${posts.length} blog posts into ${outDir}`);

  // Sync routes in src/routes.txt for SSG
  if (fs.existsSync(routesFilePath)) {
    let routesContent = fs.readFileSync(routesFilePath, 'utf8');
    const existingRoutes = new Set(
      routesContent
        .split(/\r?\n/)
        .map(r => r.trim())
        .filter(Boolean)
    );

    let updated = false;
    if (!existingRoutes.has('/blog')) {
      existingRoutes.add('/blog');
      updated = true;
    }

    for (const post of posts) {
      const blogRoute = `/blogs/${post.slug}`;
      if (!existingRoutes.has(blogRoute)) {
        existingRoutes.add(blogRoute);
        updated = true;
      }
    }

    if (updated) {
      const sortedRoutes = Array.from(existingRoutes).sort();
      fs.writeFileSync(routesFilePath, sortedRoutes.join('\n') + '\n');
      console.log(`[build-blog-manifest] Updated ${routesFilePath} with blog routes.`);
    }
  }
}

run();

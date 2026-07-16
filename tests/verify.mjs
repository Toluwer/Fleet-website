import { access, readFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', '404.html'];
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function localTarget(page, reference) {
  const clean = reference.split('#')[0].split('?')[0];
  if (!clean || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(clean)) return null;
  const relative = clean.replace(/^\.\//, '');
  if (relative.startsWith('assets/') || relative.startsWith('screens/')) {
    return join(root, 'public', relative);
  }
  return resolve(root, dirname(page), relative);
}

for (const page of pages) {
  const absolute = join(root, page);
  check(await exists(absolute), `${page}: page is missing`);
  if (!(await exists(absolute))) continue;

  const html = await readFile(absolute, 'utf8');
  check(/<!doctype html>/i.test(html), `${page}: missing doctype`);
  check(/<html[^>]+lang="en"/i.test(html), `${page}: missing English language declaration`);
  check(/<meta[^>]+name="viewport"/i.test(html), `${page}: missing viewport metadata`);
  check(/<meta[^>]+name="description"/i.test(html), `${page}: missing description metadata`);
  check(/<title>[^<]+<\/title>/i.test(html), `${page}: missing title`);
  check(/<main\b/i.test(html), `${page}: missing main landmark`);
  check(/<h1\b/i.test(html), `${page}: missing h1`);
  check(/class="skip-link"/i.test(html), `${page}: missing skip link`);
  check(/src="\.\/src\/site\.js"/i.test(html), `${page}: missing shared site script`);

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/gi)].map((match) => match[1]));
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/gi)) {
    const reference = match[1];
    if (reference.startsWith('#')) {
      check(ids.has(reference.slice(1)), `${page}: unresolved anchor ${reference}`);
      continue;
    }
    const target = localTarget(page, reference);
    if (target) check(await exists(target), `${page}: missing local reference ${reference}`);
  }
}

const index = await readFile(join(root, 'index.html'), 'utf8');
const styles = await readFile(join(root, 'src', 'styles.css'), 'utf8');
const demo = await readFile(join(root, 'src', 'demo.js'), 'utf8');
check(index.includes('data-fleet-demo'), 'index.html: interactive Fleet demo is missing');
check(index.includes('data-showcase-image'), 'index.html: screenshot showcase is missing');
check(index.includes('src="./src/demo.js"'), 'index.html: demo controller is missing');
check(index.includes('Fleet 1.5.2'), 'index.html: latest Fleet version is missing');
check(index.includes('property="og:image" content="https://toluwer.github.io/Fleet-website/screens/instances.png"'), 'index.html: Discord preview image must use an absolute public URL');
check(index.includes('name="twitter:card" content="summary_large_image"'), 'index.html: large social preview metadata is missing');
check(!/<a[^>]+href="[^"]*(?:download|installer)/i.test(index), 'index.html: product page drifted back into an installer portal');
check(styles.includes('--blue: #2f6df2'), 'styles.css: Fleet blue theme token is missing');
check(!/#9cff57|#b9ff68|#b8ff5a/i.test(styles), 'styles.css: stale neon-green theme remains');
check(index.includes('toluwer26 + ormanoa2'), 'index.html: account preview is missing');
check(demo.includes("['toluwer26','ormanoa2']"), 'src/demo.js: interactive account chips are missing');
check(!/\.ROBLOSECURITY|password|auth(?:entication)? token|session cookie/i.test(`${index}\n${demo}`), 'public client source exposes a credential field or secret');
check(index.includes('<div class="demo-titlebar-drag"></div>'), 'index.html: clean blank app titlebar is missing');

for (const screenshot of ['instances.png', 'games.png', 'people.png', 'stats.png']) {
  const bytes = await readFile(join(root, 'public', 'screens', screenshot));
  check(bytes.toString('ascii', 1, 4) === 'PNG', `${screenshot}: screenshot is not a PNG`);
  check(bytes.readUInt32BE(16) === 1860 && bytes.readUInt32BE(20) === 1000, `${screenshot}: screenshot dimensions must be 1860x1000`);
}

for (const source of ['src/site.js', 'src/demo.js']) {
  const code = await readFile(join(root, source), 'utf8');
  check(!/\b(?:TODO|FIXME)\b/.test(code), `${source}: contains unfinished marker`);
}

const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
check(packageJson.scripts?.build === 'vite build', 'package.json: build script is incorrect');
check(packageJson.scripts?.test === 'node tests/verify.mjs', 'package.json: test script is incorrect');
check(extname(join(root, 'public', 'assets', 'fleet-logo.svg')) === '.svg', 'Fleet logo path is invalid');

if (errors.length) {
  console.error(`Verification failed with ${errors.length} issue${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Verified ${pages.length} pages, local references, landmarks, and interactive entry points.`);

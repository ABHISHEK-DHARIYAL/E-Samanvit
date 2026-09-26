/**
 * Recursively runs `node --check` over every .js file under src/,
 * so `npm run check` works the same regardless of shell glob support.
 * Exits non-zero if any file fails to parse.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..', 'src');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.js')) files.push(full);
  }
  return files;
}

const files = walk(root);
let failed = false;

for (const file of files) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
    console.log(`OK    ${path.relative(root, file)}`);
  } catch (err) {
    failed = true;
    console.error(`FAIL  ${path.relative(root, file)}`);
    console.error(err.stderr ? err.stderr.toString() : err.message);
  }
}

console.log(`\n${files.length} file(s) checked.`);
if (failed) {
  console.error('Syntax check FAILED.');
  process.exit(1);
} else {
  console.log('Syntax check PASSED.');
}

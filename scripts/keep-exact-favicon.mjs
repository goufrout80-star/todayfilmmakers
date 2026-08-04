import fs from 'node:fs';

for (const path of ['app/favicon.ico', 'public/favicon.ico']) {
  fs.rmSync(path, { force: true });
}

console.log('Using the exact supplied Today Film Makers PNG favicon.');

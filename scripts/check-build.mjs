import {existsSync, readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
assert(!existsSync('dist/concepts'), 'Design concepts must not be built');
assert(!readFileSync('dist/index.html', 'utf8').includes('href="/concepts/'), 'Production index must not link to development routes');
console.log('Production isolation checks passed.');

assert(!existsSync('dist/review'), 'Review tooling must not be built');

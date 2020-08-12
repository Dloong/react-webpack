import { resolve } from 'path';

const projectRoot = resolve(__dirname, '../');
const hmrPath = '/__webpack_hmr';

export { projectRoot, hmrPath, resolve as resolvePath };

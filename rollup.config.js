import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packageJson = JSON.parse(
    readFileSync(resolve(__dirname, './package.json'))
);
const version = packageJson.version;

export default {
    input: 'src/index.ts',
    output: {
        file: `dist/metro-ru-${version}.min.js`,
        format: 'es'
    },
    plugins: [
        typescript({tsconfig: resolve(__dirname, 'tsconfig.esm.json')}),
        terser(),
        json()
    ]
};
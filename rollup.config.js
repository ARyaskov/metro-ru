import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/metro-ru.min.js',
        format: 'es'
    },
    plugins: [
        typescript(),
        terser()
    ]
};
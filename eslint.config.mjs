// @ts-check

import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(["*config.*"]),
    eslint.configs.recommended,
    tseslint.configs.recommended,
]);
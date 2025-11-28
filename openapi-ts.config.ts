import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  // automatic codegen from this spec, backend must be run in parallel together with npx @hey-api/openapi-ts command or change input url to https://school-project/z3ntl3.com/docs/doc.json
  input: 'http://localhost:2000/docs/doc.json',
  output: 'src/codegen/client',
});
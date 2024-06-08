export default [
  {
    files: ['src/**/*', 'index.ts'],
    extends: ['airbnb', 'airbnb-typescript'],
    parserOptions: {
      project: './tsconfig.json'
    }
  }
]
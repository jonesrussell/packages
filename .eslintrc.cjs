module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:node/recommended',
    'plugin:import/typescript'
  ],
  rules: {
    "node/shebang": ["error", {
      "convertPath": {
        "src/**/*.ts": ["^src/(.+?)\\.ts$", "dist/$1.js"]
      }
    }],
    "eslint-comments/no-unused-disable": "error"
  }
};

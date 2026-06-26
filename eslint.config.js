import js from "@eslint/js";
import globals from "globals";
import vitest from "@vitest/eslint-plugin";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { ignores: ["dist/**"] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
      "prefer-destructuring": "off",
    },
  },
  {
    files: ["tests/**/*.js"],
    plugins: { vitest },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  prettierRecommended,
  {
    rules: {
      "prettier/prettier": "warn",
    },
  },
];

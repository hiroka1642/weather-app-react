module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: "plugin:react/recommended",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: [
    // "next",
    // "next/core-web-vitals",
    // "eslint:recommended",
    // "plugin:react/recommended",
    // "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  plugins: ["react"],
  rules: { "no-undef": "off", "no-unused-vars": "off" },
};

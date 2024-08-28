import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2020, // Configura la versión de ECMAScript
    },
    plugins: {
      react: pluginReact,
    },
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:react/recommended', // Extiende las reglas recomendadas para React
    ],
    rules: {
      'react/react-in-jsx-scope': 'off', // Desactiva la regla para React 17+
      // Puedes agregar o sobrescribir otras reglas aquí
    },
  },
];

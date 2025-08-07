import mantine from 'eslint-config-mantine';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,
  reactHooks.configs['recommended-latest'],
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'] },
  {
    rules: {
      'no-console': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
    },
  }
);
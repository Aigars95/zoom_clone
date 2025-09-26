import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
    {
        rules: {
            "object-curly-newline": ["error", {
                ObjectExpression: { multiline: true, minProperties: 1, consistent: true },
                ObjectPattern: { multiline: true, minProperties: 1, consistent: true },
                ImportDeclaration: { multiline: true, minProperties: 1, consistent: true },
                ExportDeclaration: { multiline: true, minProperties: 1, consistent: true }
            }],
            "array-bracket-newline": ["error", { multiline: true, minItems: 2 }]
        }
    }
];

export default eslintConfig;

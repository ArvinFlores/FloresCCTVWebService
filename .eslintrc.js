module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": [
    "standard-with-typescript",
  ],
  "plugins": [
    "@stylistic/js"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "@stylistic/js/operator-linebreak": ["error", "after"],
    "@stylistic/js/max-len": [2, { "code": 120 }],
    "@stylistic/js/semi": [2, "always"],
    "@stylistic/js/arrow-parens": [2, "always"],
    "@stylistic/js/indent": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": true
        }
      }
    ],
    "@typescript-eslint/strict-boolean-expressions": [
      2,
      { "allowNullableBoolean": true }
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false
      }
    ],
    "@typescript-eslint/semi": "off"
  }
};

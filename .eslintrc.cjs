module.exports = {
    "env": {
        "es2021": true,
        "node": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
      "indent": ["error", 2],
      "semi": ["error", "never"],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": [ "error", { "before": true, "after": true }],
       "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
    }
}

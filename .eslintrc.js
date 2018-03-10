module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    "eslint:recommended",
    "plugin:ember/recommended",
    "standard"
  ],
  env: {
    browser: true
  },
  "rules": {
    "arrow-parens": ["error", "as-needed"],
    "camelcase": "off",
    "comma-dangle": ["error", "always-multiline"],
    "ember/avoid-leaking-state-in-ember-objects": "off",
    "ember/routes-segments-snake-case": "off",
    "func-call-spacing": "off",
    "generator-star-spacing": "off",
    "key-spacing": ["error", { beforeColon: true, afterColon: true, align: "colon" }],
    "new-cap": "off",
    "no-console": "off",
    "no-mixed-operators": "off",
    "no-multi-spaces": "off",
    "no-multiple-empty-lines": "off",
    "no-return-assign": "off",
    "no-sequences": "off",
    "no-template-curly-in-string": "off",
    "no-whitespace-before-property": "off",
    "operator-linebreak": "off",
    "padded-blocks": "off",
    "quotes": "off",
    "quote-props": ["error", "as-needed"],
    "spaced-comment": "off",
    "standard/object-curly-even-spacing": "off",
  },
  overrides: [
    // node files
    {
      files: [
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
    },

    // // test files
    // {
    //   files: ['tests/**/*.js'],
    //   excludedFiles: ['tests/dummy/**/*.js'],
    //   env: {
    //     embertest : true,
    //     mocha     : true,
    //   },
    //   rules : {
    //     "no-unused-expressions": "off",
    //   },
    //   globals : {
    //     sinon  : true,
    //     server : true,
    //     pause  : true,
    //   },
    // }
  ],
}

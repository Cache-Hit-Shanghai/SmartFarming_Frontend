module.exports = {
  "presets": [
    [
      "next/babel",
      {
        "preset-env": {
          "useBuiltIns": "entry"
        }
      }
    ]
  ],
  "plugins": [["styled-components", { "ssr": true }]]
};


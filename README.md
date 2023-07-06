# webpack-html-gitlog-plugin
add gitlog comments to HTML

## How to use

Install

`yarn add --dev webpack-html-gitlog-plugin`

Usage

```js
const WebpackHtmlGitlogPlugin = require("webpack-html-gitlog-plugin");

// vue.config.js
configureWebpack: {
  plugins: [
      new WebpackHtmlGitlogPlugin()
    ]
}
```

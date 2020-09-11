/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This webpack plugin lets us interpolate custom variables into `index.html`.
// Usage: `new InterpolateHtmlPlugin(HtmlWebpackPlugin, { 'MY_VARIABLE': 42 })`
// Then, you can use %MY_VARIABLE% in your `index.html`.

// It works in tandem with HtmlWebpackPlugin.
// Learn more about creating plugins like this:
// https://github.com/ampedandwired/html-webpack-plugin#events

// eslint-disable-next-line import/no-extraneous-dependencies
import escapeStringRegexp from 'escape-string-regexp';
import HtmlWebpackPlugin = require('html-webpack-plugin');

interface replaceTyeps {
  [x: string]: string
}

class InterpolateHtmlPlugin {
  htmlWebpackPlugin: typeof HtmlWebpackPlugin;
  replacements: replaceTyeps;
  constructor(htmlWebpackPlugin: typeof HtmlWebpackPlugin, replacements: replaceTyeps) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.replacements = replacements;
  }

  apply(compiler: { hooks: { compilation: { tap: (arg0: string, arg1: (compilation: any) => void) => void; }; }; }): any {
    compiler.hooks.compilation.tap('InterpolateHtmlPlugin', compilation => {
      this.htmlWebpackPlugin
        .getHooks(compilation)
        .afterTemplateExecution.tap('InterpolateHtmlPlugin', (data):any => {
          // Run HTML through a series of user-specified string replacements.
          Object.keys(this.replacements).forEach(key => {
            const value = this.replacements[key];
            data.html = data.html.replace(
              new RegExp(`%${escapeStringRegexp(key)}%`, 'g'),
              value
            );
          });
        });
    });
  }
}

export default InterpolateHtmlPlugin;

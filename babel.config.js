//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

module.exports = (api) => {
  const config = {
    presets: ["@babel/preset-react", "@babel/preset-flow"],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-syntax-dynamic-import",
      ["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }],
    ],
  };

  if (api.env("test")) {
    config.plugins.unshift("@babel/plugin-transform-modules-commonjs");
  }

  return config;
};

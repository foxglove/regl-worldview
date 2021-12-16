// @flow
//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import { addDecorator, addParameters } from "@storybook/react";
import React from "react";
import { withScreenshot } from "storycap";

import prepareForScreenshots from "./prepareForScreenshots";
import withStateReset from "./withStateReset";

if (global.FinalizationRegistry == null) {
  global.FinalizationRegistry = class {
    register() {}
  };
}

export const SCREENSHOT_VIEWPORT = {
  width: 1001,
  height: 745,
};

addDecorator((storyFn) => {
  document.querySelectorAll("[data-modalcontainer]").forEach((el) => el.remove()); // Remove leftover modals
  return React.createElement(storyFn);
});

addDecorator(withStateReset);
addDecorator(withScreenshot);
addParameters({
  screenshot: {
    delay: 100,
    viewport: SCREENSHOT_VIEWPORT,
  },
});

prepareForScreenshots();

// automatically import all files ending in *.stories.js
// $FlowFixMe - require.context seems not correctly typed.
const reqDocs = require.context("../docs", true, /\.stories\.js$/);

// load the stories
reqDocs.keys().forEach((filename) => reqDocs(filename));

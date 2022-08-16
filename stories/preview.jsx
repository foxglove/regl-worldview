// @flow
//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import { addDecorator, addParameters } from "@storybook/react";
import React from "react";
import { withScreenshot } from "storycap";
import { createGlobalStyle } from "styled-components";

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

const GlobalStyle = createGlobalStyle`
  #root {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    display: flex;
  }
`;

addDecorator((StoryFn) => {
  document.querySelectorAll("[data-modalcontainer]").forEach((el) => el.remove()); // Remove leftover modals
  return (
    <React.StrictMode>
      <GlobalStyle />
      <StoryFn />
    </React.StrictMode>
  );
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

//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import { storiesOf, addParameters } from "@storybook/react";
import React from "react";

import CameraStateControlled from "./api/CameraStateControlled";
import CameraStateUncontrolled from "./api/CameraStateUncontrolled";
import MouseEvents from "./api/MouseEvents";
import Arrows from "./commands/Arrows";
import ArrowsInteractive from "./commands/ArrowsInteractive";
import Cones from "./commands/Cones";
import Cubes from "./commands/Cubes";
import Cylinders from "./commands/Cylinders";
import FilledPolygons from "./commands/FilledPolygons";
import GLText from "./commands/GLText";
import GLTextScaleInvariant from "./commands/GLTextScaleInvariant";
import GLTFScene from "./commands/GLTFScene";
import LinesDemo from "./commands/LinesDemo";
import LinesPoses from "./commands/LinesPoses";
import LinesWireframe from "./commands/LinesWireframe";
import Overlay from "./commands/Overlay";
import Points from "./commands/Points";
import SpheresInstanced from "./commands/SpheresInstanced";
import SpheresInstancedColor from "./commands/SpheresInstancedColor";
import SpheresSingle from "./commands/SpheresSingle";
import Text from "./commands/Text";
import Triangles from "./commands/Triangles";
import BasicExample from "./examples/BasicExample";
import Composition from "./examples/Composition";
import DynamicCommands from "./examples/DynamicCommands";
import Hitmap from "./examples/Hitmap";

const allDemos = {
  Arrows,
  ArrowsInteractive,
  BasicExample,
  CameraStateControlled,
  CameraStateUncontrolled,
  Composition,
  Cones,
  Cubes,
  Cylinders,
  DynamicCommands,
  FilledPolygons,
  Hitmap,
  LinesDemo,
  LinesPoses,
  LinesWireframe,
  MouseEvents,
  Overlay,
  Points,
  SpheresInstanced,
  SpheresInstancedColor,
  SpheresSingle,
  Text,
  GLText,
  GLTextScaleInvariant,
  Triangles,
  GLTFScene,
};

// Some of these demos have movement, which we do want to allow, but which doesn't play well with screenshot tests.
const demosWithoutScreenshotTests = [DynamicCommands, FilledPolygons, Overlay, Points, SpheresInstanced];

for (const [demoName, Component] of Object.entries(allDemos)) {
  const story = () => {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Component />
      </div>
    );
  };
  const hasScreenshotTest = !demosWithoutScreenshotTests.includes(Component);
  storiesOf("Worldview docs", module)
    .addParameters({ screenshot: hasScreenshotTest ? { delay: 200 } : { skip: true } })
    .add(demoName, story);
}

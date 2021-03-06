//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

// #BEGIN EXAMPLE
import Worldview, { Lines } from "@foxglove/regl-worldview";
import React from "react";

// #BEGIN EDITABLE
function Example() {
  const lines = [
    {
      pose: {
        position: { x: 0, y: 0, z: 0 },
        orientation: { x: 0, y: 0, z: 0, w: 0 },
      },
      scale: { x: 0.1, y: 0.1, z: 0.1 },
      color: { r: 0, g: 1, b: 0, a: 1 },
      points: [
        { x: 0, y: -3, z: 1 },
        { x: 1, y: -2, z: 1 },
        { x: 0, y: -3, z: 0 },
        { x: 1, y: -2, z: 0 },

        { x: 0, y: -3, z: 1 },
        { x: 0, y: -3, z: 0 },

        { x: 1, y: -2, z: 1 },
        { x: 0.5, y: 0, z: 1 },
        { x: 1, y: -2, z: 0 },
        { x: 0.5, y: 0, z: 0 },

        { x: 1, y: -2, z: 1 },
        { x: 1, y: -2, z: 0 },

        { x: 0.5, y: 0, z: 1 },
        { x: -1, y: -1, z: 1 },
        { x: 0.5, y: 0, z: 0 },
        { x: -1, y: -1, z: 0 },

        { x: 0.5, y: 0, z: 1 },
        { x: 0.5, y: 0, z: 0 },

        { x: -1, y: -1, z: 1 },
        { x: 0, y: -3, z: 1 },
        { x: -1, y: -1, z: 0 },
        { x: 0, y: -3, z: 0 },

        { x: -1, y: -1, z: 1 },
        { x: -1, y: -1, z: 0 },
      ],
      colors: [],
    },
  ];
  return (
    <Worldview defaultCameraState={{ distance: 10 }}>
      <Lines>{lines}</Lines>
    </Worldview>
  );
}
// #END EXAMPLE

export default Example;

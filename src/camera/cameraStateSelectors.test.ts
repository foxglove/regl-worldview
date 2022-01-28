//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.
import { vec3, quat } from "gl-matrix";

import { DEFAULT_CAMERA_STATE } from "./CameraStore";
import selectors from "./cameraStateSelectors";

describe("cameraStateSelectors", () => {
  it("apply translate for targetOrientation for orthographic mode", () => {
    const cameraState = {
      ...DEFAULT_CAMERA_STATE,
      perspective: false,
      targetOrientation: quat.fromEuler([0, 0, 0, 0], 90, 0, 0),
    };
    const matrix = selectors.view(cameraState);
    const location = [0, 0, 0];
    vec3.transformMat4(location, location, matrix);
    expect(location).toEqual([0, 0, -2500]);
  });
});

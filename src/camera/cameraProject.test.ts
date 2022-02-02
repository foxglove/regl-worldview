//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.
// Copied from Jam3/camera-project
// in order to replace gl-vec4 dependency with gl-matrix
import { vec3, mat4 } from "gl-matrix";

import { Mat4, Vec4, Vec3 } from "..";
import project from "./cameraProject";

describe("cameraProject", () => {
  it("projects 3D point into 2D window space", () => {
    const viewport: Vec4 = [0, 0, 128, 256];
    const proj: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const view: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const position: Vec3 = [0, 0, -3];
    const direction: Vec3 = [0, 0, -1];
    const up: Vec3 = [0, 1, 0];
    const center: Vec3 = [0, 0, 0];
    mat4.perspective(proj, Math.PI / 4, viewport[2] / viewport[3], 0.01, 100);
    // build view matrix
    vec3.add(center, position, direction);
    mat4.lookAt(view, position, center, up);
    const combined = mat4.multiply([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], proj, view) as Mat4;
    const point3d: Vec3 = [0, 0, 5];
    const out = project([0, 0, 0, 0], point3d, viewport, combined);
    expect(out[0]).toBe(viewport[2] / 2);
    expect(out[1]).toBe(viewport[3] / 2);
  });
});

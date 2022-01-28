//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.
import type { BaseProps, Props } from "../Worldview";
import type { CameraState } from "../camera/CameraStore";
import { Ray } from "../utils/Raycast";

export type { CameraState, BaseProps, Props };
export type Dimensions = {
  width: number;
  height: number;
  left: number;
  top: number;
};
export type ReglCommand = {
  vert: string | ((props: unknown, context: unknown) => string);
  frag: string;
  uniforms?: any;
};
export type CompiledReglCommand<T> = (props: T, context: any) => void;
export type ReglFn = <T>(arg0: ReglCommand) => CompiledReglCommand<T>;
type Command<T> = (arg0: T | T[], ...args: any[]) => void;
export type RawCommand<T> = (regl: any) => {} | Command<T>;
export type Regl = {
  limits: {
    pointSizeDims: [number, number];
  };
  prop: (arg0: string) => any;
  context: (arg0: string) => any;
};
export type CommandProps = Record<string, any>;
export type CommandDict = Record<string, Command<any>>;
// [left, top, width, height]
export type Viewport = [number, number, number, number];
export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type Vec4 = [number, number, number, number];
export type Mat4 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];
export interface CameraCommand {
  getProjection(): Mat4;
  getView(): Mat4;
  toScreenCoord(viewport: Viewport, point: Vec3): Vec3 | null | undefined;
  draw(props: {}, arg1: (ctx: any) => void): void;
}
export type ReglContext = {
  regl: ReglFn;
  camera: CameraCommand;
  commands: CommandDict;
};
export type ArrowSize = {
  shaftLength: number;
  shaftWidth: number;
  headLength: number;
  headWidth: number;
};
type ClickedObject = {
  object: Record<string, any>;
  instanceIndex?: number | null | undefined;
};
export type ReglClickInfo = {
  ray: Ray;
  objects: Array<ClickedObject>;
};
export type ComponentReglClickInfo = {
  ray: Ray;
  objects: Array<ClickedObject>;
};
export type MouseHandler = (arg0: React.MouseEvent<HTMLCanvasElement>, arg1: ReglClickInfo) => void;
export type ComponentMouseHandler = (arg0: React.MouseEvent<HTMLCanvasElement>, arg1: ComponentReglClickInfo) => void;
export type Coordinate = [number, number];
export type Point = {
  x: number;
  y: number;
  z: number;
};
export type Position = Point;
export type Orientation = {
  x: number;
  y: number;
  z: number;
  w: number;
};
export type Scale = {
  x: number;
  y: number;
  z: number;
};
export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};
export type Colors = Color[];
export type Pose = {
  position: Position;
  orientation: Orientation;
};
export type BaseShape = {
  pose: Pose;
  scale: Scale;
  color?: Color | Vec4;
};
export type Arrow = BaseShape & {
  points?: Point[];
  interactionData?: any;
};
export type Cube = BaseShape & {
  colors?: (Color | Vec4)[];
  points?: (Point | Vec3)[];
};
export type Cone = BaseShape & {
  colors?: (Color | Vec4)[];
  points?: (Point | Vec3)[];
};
export type Cylinder = BaseShape & {
  colors?: (Color | Vec4)[];
  points?: (Point | Vec3)[];
};
export type Line = BaseShape & {
  points: (Point | Vec3)[];
  poses?: Pose[];
};
export type PointType = BaseShape & {
  colors?: (Color | Vec4)[];
  points: (Point | Vec3)[];
};
export type SphereList = BaseShape & {
  points?: (Point | Vec3)[];
};
export type TriangleList = BaseShape & {
  points: (Point | Vec3)[];
  colors?: (Color | Vec4)[];
  // Pass true to not render the triangles to the screen - just the hitmap.
  onlyRenderInHitmap?: boolean;
};
export type PolygonType = BaseShape & {
  points: (Point | Vec3)[];
};
export type MouseEventObject = {
  object: BaseShape;
  instanceIndex: number | null | undefined;
};
export type DepthState = {
  enable?: boolean;
  mask?: boolean;
};
export type BlendFuncValue = string | number;
export type BlendState = {
  enable?: boolean;
  func?:
    | BlendFuncValue
    | {
        src?: BlendFuncValue;
        dst?: BlendFuncValue;
        srcAlpha?: BlendFuncValue;
        srcRGB?: BlendFuncValue;
        dstRGB?: BlendFuncValue;
        dstAlpha?: BlendFuncValue;
      };
  equation?:
    | string
    | {
        rgb: string;
        alpha: string;
      };
  color?: Vec4;
};
export type ObjectHitmapId = number;

/*
 * object: the object to pass to event callbacks when this object is interacted with.
 * count: How many colors to map to the callback object. If this is greater than 1, this assigns instance indices for
          the object.
 * return type: an array of the colors assigned.
 */
export type AssignNextColorsFn = (object: Record<string, any>, count: number) => Vec4[];
export type GetChildrenForHitmap = <T>(prop: T, arg1: AssignNextColorsFn, arg2: MouseEventObject[]) => T;
export type MouseEventEnum = "onClick" | "onMouseUp" | "onMouseMove" | "onMouseDown" | "onDoubleClick";
export type CameraAction =
  | "moveDown"
  | "moveLeft"
  | "moveRight"
  | "moveUp"
  | "rotateLeft"
  | "rotateRight"
  | "tiltDown"
  | "tiltUp"
  | "zoomIn"
  | "zoomOut";
export type CameraKeyMap = Record<string, CameraAction | false | null>;

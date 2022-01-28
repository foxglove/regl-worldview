//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.
import * as React from "react";

import type { Point, Vec3, Dimensions, Pose } from "../types";
import type { WorldviewContextType } from "../WorldviewContext";
import "../WorldviewContext";
import WorldviewReactContext from "../WorldviewReactContext";

type PoseObj = {
  pose: Pose;
};
type RenderItemInput<T extends PoseObj> = {
  item: T;
  coordinates: Vec3 | null | undefined;
  index: number;
  dimension: Dimensions;
};
type Props<T extends PoseObj> = {
  children: T[];
  renderItem: (arg0: RenderItemInput<T>) => React.ReactNode;
};
type State = {
  items: React.ReactNode[];
}; // A command that renders arbitrary DOM nodes on top of the Worldview 3D scene.
// It supplies coordinates to the `renderItem` prop for positioning DOM nodes relative to the canvas.

export default class Overlay<T extends PoseObj> extends React.Component<Props<T>, State> {
  _context: WorldviewContextType | null | undefined;
  state = {
    items: [],
  };

  componentDidMount() {
    if (this._context) {
      this._context.registerPaintCallback(this.paint);
    }
  }

  componentWillUnmount = () => {
    if (this._context) {
      this._context.unregisterPaintCallback(this.paint);
    }
  };
  paint = () => {
    const context = this._context;
    const dimension = context && context.dimension;
    const { renderItem, children } = this.props;

    if (!context || !dimension) {
      return;
    }

    const items = children.map((item, index) => {
      const coordinates = this.project(item.pose.position, context);
      return renderItem({
        item,
        index,
        coordinates,
        dimension,
      });
    });
    this.setState({
      items,
    });
  };
  project = (point: Point, context: WorldviewContextType | null | undefined): Vec3 | null | undefined => {
    if (!context || !context.initializedData) {
      return;
    }

    const { dimension } = context;
    const { camera } = context.initializedData;
    const vec = [point.x, point.y, point.z];
    const { left, top, width, height } = dimension;
    const viewport = [left, top, width, height];
    return camera.toScreenCoord(viewport, vec);
  };

  render() {
    return (
      <React.Fragment>
        <WorldviewReactContext.Consumer>
          {(ctx: WorldviewContextType | null | undefined) => {
            if (ctx) {
              this._context = ctx;
            }

            return this.state.items;
          }}
        </WorldviewReactContext.Consumer>
      </React.Fragment>
    );
  }
}

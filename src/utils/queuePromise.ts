//
//  Copyright (c) 2019-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.
import type { Signal } from "./signal";
import { signal } from "./signal";

type QueuedFn = ((...args: any[]) => Promise<any>) & {
  currentPromise: Promise<any> | null | undefined;
}; // Wait for the previous promise to resolve before starting the next call to the function.

export default function queuePromise(fn: (...args: any[]) => Promise<any>): QueuedFn {
  // Whether we are currently waiting for a promise returned by `fn` to resolve.
  let calling = false;
  // The list of calls made to the function was made while a call was in progress.
  const nextCalls: {
    args: any[];
    promise: Signal<any>;
  }[] = [];

  async function queuedFn(...args) {
    if (calling) {
      const returnPromise = signal();
      nextCalls.push({
        args,
        promise: returnPromise
      });
      return await returnPromise;
    }

    return await start(...args);
  }

  async function start(...args) {
    calling = true;
    const promise = fn(...args).finally(() => {
      calling = false;
      queuedFn.currentPromise = undefined;

      if (nextCalls.length > 0) {
        const {
          promise: nextPromise,
          args: nextArgs
        } = nextCalls.shift();
        start(...nextArgs).then(result => nextPromise.resolve(result)).catch(error => nextPromise.reject(error));
      }
    });
    queuedFn.currentPromise = promise;
    return await promise;
  }

  return queuedFn;
}
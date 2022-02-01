//
//  Copyright (c) 2019-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.
import type { Signal } from "./signal";
import { signal } from "./signal";

type QueuedFn<Args extends unknown[], Ret> = ((...args: Args) => Promise<Ret>) & {
  currentPromise: Promise<Ret> | undefined;
};

// Wait for the previous promise to resolve before starting the next call to the function.
export default function queuePromise<Args extends unknown[], Ret>(
  fn: (...args: Args) => Promise<Ret>
): QueuedFn<Args, Ret> {
  // Whether we are currently waiting for a promise returned by `fn` to resolve.
  let calling = false;
  // The list of calls made to the function was made while a call was in progress.
  const nextCalls: {
    args: Args;
    promise: Signal<Ret>;
  }[] = [];

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const queuedFn: QueuedFn<Args, Ret> = (...args: Args) => {
    if (calling) {
      const returnPromise = signal<Ret>();
      nextCalls.push({
        args,
        promise: returnPromise,
      });
      return returnPromise;
    }

    return start(...args);
  };
  queuedFn.currentPromise = undefined;

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  function start(...args: Args) {
    calling = true;
    const promise = fn(...args).finally(() => {
      calling = false;
      queuedFn.currentPromise = undefined;

      if (nextCalls.length > 0) {
        const { promise: nextPromise, args: nextArgs } = nextCalls.shift()!;
        start(...nextArgs)
          .then((result) => nextPromise.resolve(result))
          .catch((error: Error) => nextPromise.reject(error));
      }
    });
    queuedFn.currentPromise = promise;
    return promise;
  }

  return queuedFn;
}

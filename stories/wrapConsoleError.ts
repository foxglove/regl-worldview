//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

/*
 * This module wraps console.error so that we can subscribe to it.
 * It exports functions that enable subscribing and unsubscribing to console.error.
 */
const wrappedConsoleError = window.console.error;
let consoleErrorSubscriptions: Array<(...args: Array<any>) => any> = [];

window.console.error = (...data) => {
  consoleErrorSubscriptions.forEach(subscription => subscription(...data));
  wrappedConsoleError(...data);
};

export function addConsoleErrorListener(fn: (...args: Array<any>) => any): void {
  consoleErrorSubscriptions.push(fn);
}
export function removeConsoleErrorListener(fn: (...args: Array<any>) => any): void {
  consoleErrorSubscriptions = consoleErrorSubscriptions.filter(existingFn => existingFn !== fn);
}
/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */

import * as ts from "typescript";
import { couldBeType } from "./could-be-type";

export function couldBeFunction(type: ts.Type): boolean {
  return (
    type.getCallSignatures().length > 0 ||
    couldBeType(type, "Function") ||
    couldBeType(type, "ArrowFunction") ||
    couldBeType(type, ts.InternalSymbolName.Function)
  );
}

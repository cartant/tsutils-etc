/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */

import * as ts from "typescript";
import * as tsutils from "tsutils";

export function isIntersectionType(type: ts.Type): type is ts.UnionType {
  return tsutils.isTypeFlagSet(type, ts.TypeFlags.Intersection);
}
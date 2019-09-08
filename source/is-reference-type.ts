/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */

import * as tsutils from "tsutils";
import * as ts from "typescript";

export function isReferenceType(type: ts.Type): type is ts.TypeReference {
  return (
    tsutils.isTypeFlagSet(type, ts.TypeFlags.Object) &&
    tsutils.isObjectFlagSet(type as ts.ObjectType, ts.ObjectFlags.Reference)
  );
}

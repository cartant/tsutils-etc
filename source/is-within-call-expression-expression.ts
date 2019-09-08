/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */

import * as tsutils from "tsutils";
import * as ts from "typescript";

export function isWithinCallExpressionExpression(node: ts.Node): boolean {
  let { parent } = node;
  while (parent && tsutils.isPropertyAccessExpression(parent)) {
    node = parent;
    parent = node.parent;
  }
  return (
    parent && tsutils.isCallExpression(parent) && node === parent.expression
  );
}

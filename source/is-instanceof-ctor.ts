/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */

import * as tsutils from "tsutils";
import * as ts from "typescript";

export function isInstanceofCtor(node: ts.Node): boolean {
  const { parent } = node;
  return (
    tsutils.isBinaryExpression(parent) &&
    node === parent.right &&
    parent.operatorToken.kind === ts.SyntaxKind.InstanceOfKeyword
  );
}

/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */

import * as ts from "typescript";
import * as tsutils from "tsutils";

export function isWithinParameterDeclaration(node: ts.Node): boolean {
  if (tsutils.isParameterDeclaration(node)) {
    return true;
  }
  return (
    tsutils.isBindingElement(node) &&
    tsutils.isBindingPattern(node.parent) &&
    tsutils.isParameterDeclaration(node.parent.parent)
  );
}

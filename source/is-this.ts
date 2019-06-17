/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */

import * as ts from "typescript";

export function isThis(node: ts.Node): boolean {
  return node.kind === ts.SyntaxKind.ThisKeyword;
}

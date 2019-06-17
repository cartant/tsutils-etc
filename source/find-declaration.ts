/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */

import * as ts from "typescript";

export function findDeclaration(
  node: ts.Node,
  typeChecker: ts.TypeChecker
): ts.Declaration | undefined {
  const symbol = typeChecker.getSymbolAtLocation(node);
  if (!symbol) {
    return undefined;
  }
  const declarations = symbol.getDeclarations();
  if (!declarations || declarations.length === 0) {
    return undefined;
  }
  const [declaration] = declarations;
  return declaration;
}

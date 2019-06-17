/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */

import * as ts from "typescript";
import * as tsutils from "tsutils";

export function isConstDeclaration(declaration: ts.Declaration): boolean {
  let variableDeclarationList: ts.VariableDeclarationList | null = null;

  if (tsutils.isVariableDeclaration(declaration)) {
    if (tsutils.isVariableDeclarationList(declaration.parent)) {
      variableDeclarationList = declaration.parent;
    }
  } else if (tsutils.isBindingElement(declaration)) {
    let parent: ts.Node = declaration.parent;
    while (
      tsutils.isBindingPattern(parent) ||
      tsutils.isVariableDeclaration(parent)
    ) {
      parent = parent.parent;
    }
    if (tsutils.isVariableDeclarationList(parent)) {
      variableDeclarationList = parent;
    }
  }

  if (variableDeclarationList) {
    return (
      tsutils.getVariableDeclarationKind(variableDeclarationList) ===
      tsutils.VariableDeclarationKind.Const
    );
  }
  return false;
}

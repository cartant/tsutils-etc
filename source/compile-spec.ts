/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */

import { Compiler } from "ts-snippet";
import * as ts from "typescript";

export function compile(
  compiler: Compiler,
  source: string
): {
  sourceFile: ts.SourceFile;
  typeChecker: ts.TypeChecker;
} {
  const program = compiler.compile({
    "a.ts": "export class A {}",
    "b.ts": "export class B {}",
    "source.ts": source,
  });
  return {
    sourceFile: program.getSourceFile("source.ts")!,
    typeChecker: program.getTypeChecker(),
  };
}

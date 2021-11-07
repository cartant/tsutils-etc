/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */
/*tslint:disable:no-unused-expression*/

import { tsquery } from "@phenomnomnominal/tsquery";
import { expect } from "chai";
import { Compiler } from "ts-snippet";
import { compile } from "./compile-spec";
import { isUnknown } from "./is-unknown";

describe("isUnknown", () => {
  const compiler = new Compiler();

  it("should match unknown", () => {
    const { sourceFile, typeChecker } = compile(
      compiler,
      `
      let a: unknown;
      `
    );
    const [node] = tsquery(sourceFile, "VariableDeclaration");
    const type = typeChecker.getTypeAtLocation(node);
    expect(isUnknown(type)).to.be.true;
  });

  it("should not match non-unknown", () => {
    const { sourceFile, typeChecker } = compile(
      compiler,
      `
      let a: string;
      `
    );
    const [node] = tsquery(sourceFile, "VariableDeclaration");
    const type = typeChecker.getTypeAtLocation(node);
    expect(isUnknown(type)).to.be.false;
  });
});

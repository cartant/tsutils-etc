/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */
/*tslint:disable:no-unused-expression*/

import { tsquery } from "@phenomnomnominal/tsquery";
import { expect } from "chai";
import { Compiler } from "ts-snippet";
import { compile } from "./compile-spec";
import { isIntersectionType } from "./is-intersection-type";

describe("isIntersectionType", () => {
  const compiler = new Compiler();

  it("should match intersection types", () => {
    const { sourceFile, typeChecker } = compile(
      compiler,
      `
      class A {}
      class B {}
      let ab: A & B;
      `
    );
    const [node] = tsquery(sourceFile, "VariableDeclaration");
    const type = typeChecker.getTypeAtLocation(node);
    expect(isIntersectionType(type)).to.be.true;
  });
});

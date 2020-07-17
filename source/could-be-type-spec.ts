/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */
/*tslint:disable:no-unused-expression*/

import { tsquery } from "@phenomnomnominal/tsquery";
import { expect } from "chai";
import { Compiler } from "ts-snippet";
import { compile } from "./compile-spec";
import { couldBeType } from "./could-be-type";

describe("couldBeType", () => {
  const compiler = new Compiler();

  it("should match a specific type", () => {
    const { sourceFile, typeChecker } = compile(
      compiler,
      `
      class A {}
      let a: A;
      `
    );
    const [node] = tsquery(sourceFile, "VariableDeclaration");
    const type = typeChecker.getTypeAtLocation(node);
    expect(couldBeType(type, "A")).to.be.true;
  });

  it("should not match different types", () => {
    const { sourceFile, typeChecker } = compile(
      compiler,
      `
      class A {}
      class B {}
      let b: B;
      `
    );
    const [node] = tsquery(sourceFile, "VariableDeclaration");
    const type = typeChecker.getTypeAtLocation(node);
    expect(couldBeType(type, "A")).to.be.false;
    expect(couldBeType(type, "B")).to.be.true;
  });

  it("should match a base type", () => {
    const { sourceFile, typeChecker } = compile(
      compiler,
      `
      class A {}
      class B extends A {}
      let b: B;
      `
    );
    const [node] = tsquery(sourceFile, "VariableDeclaration");
    const type = typeChecker.getTypeAtLocation(node);
    expect(couldBeType(type, "A")).to.be.true;
    expect(couldBeType(type, "B")).to.be.true;
  });

  it("should match an implemented interface", () => {
    const { sourceFile, typeChecker } = compile(
      compiler,
      `
      interface A { name: string; }
      class B implements A { name = ""; }
      let b: B;
      `
    );
    const [node] = tsquery(sourceFile, "VariableDeclaration");
    const type = typeChecker.getTypeAtLocation(node);
    expect(couldBeType(type, "A")).to.be.true;
    expect(couldBeType(type, "B")).to.be.true;
  });

  it("should match an intersection type", () => {
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
    expect(couldBeType(type, "A")).to.be.true;
    expect(couldBeType(type, "B")).to.be.true;
  });

  it("should match a union type", () => {
    const { sourceFile, typeChecker } = compile(
      compiler,
      `
      class A {}
      class B {}
      let ab: A | B;
      `
    );
    const [node] = tsquery(sourceFile, "VariableDeclaration");
    const type = typeChecker.getTypeAtLocation(node);
    expect(couldBeType(type, "A")).to.be.true;
    expect(couldBeType(type, "B")).to.be.true;
  });

  it("should support fully-qualified types", () => {
    const { sourceFile, typeChecker } = compile(
      compiler,
      `
      import { A } from "./a";
      class B {}
      let a: A;
      let b: B;
      `
    );
    const [nodeA, nodeB] = tsquery(sourceFile, "VariableDeclaration");
    const typeA = typeChecker.getTypeAtLocation(nodeA);
    const typeB = typeChecker.getTypeAtLocation(nodeB);
    expect(
      couldBeType(typeA, "A", {
        name: /"a"/,
        typeChecker,
      })
    ).to.be.true;
    expect(
      couldBeType(typeB, "B", {
        name: /"b"/,
        typeChecker,
      })
    ).to.be.false;
  });
});

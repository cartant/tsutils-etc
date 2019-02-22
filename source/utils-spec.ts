/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tsutils-etc
 */
/*tslint:disable:no-unused-expression*/

import { tsquery } from "@phenomnomnominal/tsquery";
import { expect } from "chai";
import { Compiler } from "ts-snippet";
import * as ts from "typescript";
import { couldBeType, isIntersectionType, isUnionType } from "./utils";

describe("utils", () => {

    const compiler = new Compiler();

    describe("couldBeFunction", () => {

        it.skip("should be tested", () => {
        });
    });

    describe("couldBeType", () => {

        it("should match a specific type", () => {
            const { sourceFile, typeChecker } = compile(`
                class A {}
                let a: A;
            `);
            const [node] = tsquery(sourceFile, "VariableDeclaration");
            const type = typeChecker.getTypeAtLocation(node);
            expect(couldBeType(type, "A")).to.be.true;
        });

        it("should not match different types", () => {
            const { sourceFile, typeChecker } = compile(`
                class A {}
                class B {}
                let b: B;
            `);
            const [node] = tsquery(sourceFile, "VariableDeclaration");
            const type = typeChecker.getTypeAtLocation(node);
            expect(couldBeType(type, "A")).to.be.false;
            expect(couldBeType(type, "B")).to.be.true;
        });

        it("should match a base type", () => {
            const { sourceFile, typeChecker } = compile(`
                class A {}
                class B extends A {}
                let b: B;
            `);
            const [node] = tsquery(sourceFile, "VariableDeclaration");
            const type = typeChecker.getTypeAtLocation(node);
            expect(couldBeType(type, "A")).to.be.true;
            expect(couldBeType(type, "B")).to.be.true;
        });

        it("should match an intersection type", () => {
            const { sourceFile, typeChecker } = compile(`
                class A {}
                class B {}
                let ab: A & B;
            `);
            const [node] = tsquery(sourceFile, "VariableDeclaration");
            const type = typeChecker.getTypeAtLocation(node);
            expect(couldBeType(type, "A")).to.be.true;
            expect(couldBeType(type, "B")).to.be.true;
        });

        it("should match a union type", () => {
            const { sourceFile, typeChecker } = compile(`
                class A {}
                class B {}
                let ab: A | B;
            `);
            const [node] = tsquery(sourceFile, "VariableDeclaration");
            const type = typeChecker.getTypeAtLocation(node);
            expect(couldBeType(type, "A")).to.be.true;
            expect(couldBeType(type, "B")).to.be.true;
        });
    });

    describe("findDeclaration", () => {

        it.skip("should be tested", () => {
        });
    });

    describe("isConstDeclaration", () => {

        it.skip("should be tested", () => {
        });
    });

    describe("isInstanceofCtor", () => {

        it.skip("should be tested", () => {
        });
    });

    describe("isIntersectionType", () => {

        it("should match intersection types", () => {
            const { sourceFile, typeChecker } = compile(`
                class A {}
                class B {}
                let ab: A & B;
            `);
            const [node] = tsquery(sourceFile, "VariableDeclaration");
            const type = typeChecker.getTypeAtLocation(node);
            expect(isIntersectionType(type)).to.be.true;
        });
    });

    describe("isReferenceType", () => {

        it.skip("should be tested", () => {
        });
    });

    describe("isThis", () => {

        it.skip("should be tested", () => {
        });
    });

    describe("isType", () => {

        it.skip("should be tested", () => {
        });
    });

    describe("isUnionType", () => {

        it("should match union types", () => {
        const { sourceFile, typeChecker } = compile(`
            class A {}
            class B {}
            let ab: A | B;
        `);
        const [node] = tsquery(sourceFile, "VariableDeclaration");
        const type = typeChecker.getTypeAtLocation(node);
        expect(isUnionType(type)).to.be.true;
        });
    });

    describe("isWithinCallExpressionExpression", () => {

        it.skip("should be tested", () => {
        });
    });

    describe("isWithinParameterDeclaration", () => {

        it.skip("should be tested", () => {
        });
    });

    function compile(source: string): {
        sourceFile: ts.SourceFile,
        typeChecker: ts.TypeChecker
    } {
        const program = compiler.compile({
            "source.ts": source
        });
        return {
            sourceFile: program.getSourceFile("source.ts")!,
            typeChecker: program.getTypeChecker()
        };
    }
});

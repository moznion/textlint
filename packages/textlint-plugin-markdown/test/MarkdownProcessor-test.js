// LICENSE : MIT
"use strict";
import assert from "power-assert";
import MarkdownPlugin from "../src/index";
import { TextLintCore } from "textlint";
import path from "path";

describe("MarkdownPlugin", function() {
    let textlint;
    beforeEach(function() {
        textlint = new TextLintCore();
        textlint.setupPlugins({ html: MarkdownPlugin });
        textlint.setupRules({ "no-todo": require("textlint-rule-no-todo") });
    });
    context("when target file is a HTML", function() {
        it("should report error", function() {
            const fixturePath = path.join(__dirname, "/test.md");
            return textlint.lintFile(fixturePath).then(results => {
                assert(results.messages.length > 0);
                assert(results.filePath === fixturePath);
            });
        });
    });
    context("when target is text", function() {
        it("should report error", function() {
            return textlint.lintText("TODO: this is todo", ".markdown").then(results => {
                assert(results.messages.length === 1);
                assert(results.filePath === "<markdown>");
            });
        });
    });
});

"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-slack-app:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      name: "TestApp",
      version: "0.1.0",
      description: "test",
      main: "",
    });
  });

  it("creates files", () => {
    assert.file([".env"]);
    assert.file([".gitignore"]);
    assert.file(["Procfile"]);
    assert.file(["app.js"]);
    assert.file(["package.json"]);
  });
});

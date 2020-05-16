"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const extend = require("deep-extend");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the rad ${chalk.red("generator-slack-app")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your Slack App name",
        default: this.appname,
      },
      {
        type: "input",
        name: "version",
        message: "Your Slack App version",
        default: "0.1.0",
      },
      {
        type: "input",
        name: "description",
        message: "Your Slack App description",
      },
      {
        type: "input",
        name: "main",
        message: "Your Slack App main file",
        default: "app.js",
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  writing() {
    const pkg = this.fs.readJSON(this.templatePath("_package.json"), {});

    extend(pkg, {
      name: this.props.name,
      version: this.props.version,
      description: this.props.description,
      main: this.props.main,
    });

    this.fs.copy(this.templatePath("env"), this.destinationPath(".env"));
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("_app.js"),
      this.destinationPath(this.props.main)
    );

    this.fs.writeJSON(this.destinationPath("package.json"), pkg);
  }

  install() {
    this.installDependencies({ bower: false });
  }
};

"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");

module.exports = class extends Generator {
  prompting() {
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
        default: "New Slack App",
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
    this.fs.copy(this.templatePath("env"), this.destinationPath(".env"));
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("_app.js"),
      this.destinationPath(this.props.main)
    );

    const packageTpl = _.template(
      JSON.stringify(this.fs.readJSON(this.templatePath("_package.json")))
    );

    this.fs.writeJSON(
      this.destinationPath("package.json"),
      JSON.parse(
        packageTpl({
          slackAppName: this.props.name,
          slackAppDescription: this.props.description,
          slackAppVersion: this.props.version,
          slackAppEntryPoint: this.props.main,
        })
      )
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};

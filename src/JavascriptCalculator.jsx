import React, { Component } from "react";
import Buttons from "./Buttons";

class JavascriptCalculator extends Component {
  state = {
    formula: "",
    output: "0",
    previousVal: null,
    operator: null,
  };

  handleInitialize = () => {
    this.setState({
      formula: "",
      output: "0",
      previousVal: null,
      operator: null,
    });
  };

  handleOperators = (operator) => {
    const { output, previousVal } = this.state;
    const value = parseFloat(output);

    if (previousVal === null) {
      this.setState({
        previousVal: value,
        formula: value + operator,
        operator,
      });
    } else {
      const result = this.performOperation(previousVal, value, operator);
      this.setState({
        formula: result + operator,
        output: result.toString(),
        previousVal: result,
        operator,
      });
    }
  };

  handleNumbers = (number) => {
    const { output, formula, operator, previousVal } = this.state;

    if (output === "0" && number !== ".") {
      this.setState({
        output: number,
        formula: previousVal ? formula + number : number,
      });
    } else if (operator && previousVal !== null) {
      this.setState({
        output: output + number,
        formula: previousVal + operator + output + number,
        previousVal: null,
      });
    } else {
      this.setState({
        output: output + number,
        formula: formula + number,
      });
    }
  };

  handleEvaluate = () => {
    const { output, previousVal, operator } = this.state;
    const value = parseFloat(output);
    const result = this.performOperation(previousVal, value, operator);

    this.setState({
      formula: result.toString(),
      output: result.toString(),
      previousVal: null,
      operator: null,
    });
  };

  performOperation = (previousVal, value, operation) => {
    switch (operation) {
      case "+":
        return previousVal + value;
      case "-":
        return previousVal - value;
      case "x":
        return previousVal * value;
      case "/":
        return previousVal / value;
      default:
        return value;
    }
  };

  render() {
    const { output } = this.state;
    return (
      <div className="calculator">
        <div className="display">
          <div className="formula">{this.state.formula}</div>
          <div className="output">{output}</div>
        </div>
        <Buttons
          initialize={this.handleInitialize}
          operators={this.handleOperators}
          numbers={this.handleNumbers}
          evaluate={this.handleEvaluate}
        />
      </div>
    );
  }
}

export default JavascriptCalculator;

import React, { Component } from "react";
import Buttons from "./Buttons";

class JavascriptCalculator extends Component {
  state = {
    formula: "",
    output: "0",
    previousVal: null,
    operator: null,
    calculationJustPerformed: false,
  };

  handleInitialize = () => {
    this.setState({
      formula: "",
      output: "0",
      previousVal: null,
      operator: null,
    });
  };

  handleNumbers = (number) => {
    const { output, formula, operator, calculationJustPerformed } = this.state;

    if (calculationJustPerformed) {
      this.setState({
        output: number,
        formula: number,
        calculationJustPerformed: false
      });
    } else  if (operator) {
      // Start a new number after an operator
      this.setState({
        output: number,
        formula: formula + number,
        operator: null
      });
    } else if (output === "0" && number !== ".") {
      // Replace initial zero
      this.setState({
        output: number,
        formula: formula === "0" ? number : formula + number
      });
    } else {
      // Continue the current number
      this.setState({
        output: output + number,
        formula: formula + number
      });
    }
  };
  
  handleOperators = (newOperator) => {
    const { output, formula, operator } = this.state;
  
    if (operator) {
      // Replace the last operator
      this.setState({
        formula: formula.slice(0, -1) + newOperator,
        operator: newOperator
      });
    } else {
      // Add the operator to the formula
      this.setState({
        formula: formula + newOperator,
        operator: newOperator,
        previousVal: parseFloat(output)
      });
    }
  };

handleEvaluate = () => {
  const { formula } = this.state;
  const parts = formula.split(/([+\-x/])/);
  
  if (parts.length < 3) return;

  let result = parseFloat(parts[0]);
  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const value = parseFloat(parts[i + 1]);
    result = this.performOperation(result, value, operator);
  }

  this.setState({
    formula: result.toString(),
    output: result.toString(),
    previousVal: null,
    operator: null,
    calculationJustPerformed: true
  });
};


  performOperation = (previousVal, value, operator) => {
    switch (operator) {
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
        <div  className="display">
          <div className="formula">{this.state.formula}</div>
          <div id="display" className="output">{output}</div>
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

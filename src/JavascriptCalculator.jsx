import React, { Component } from "react";
import Buttons from "./Buttons";

const endsWithOperator = /[x+-/]$/;
const endsWithNegativeSign = /\d[x/+-]{1}-$/;

class JavascriptCalculator extends Component {
  state = {
    currentVal: "",
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

    if (number === "." && output.includes(".")) {
      return;
    }

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
    } else  {
      // Replace initial zero
      this.setState({
        output: output === "0" && number !== "." ? number : output + number,
        formula: formula === "0" && number !== "." ? number : formula + number
      });
    } 
  };
  
handleEvaluate = () => {
  const { formula } = this.state;
  
  if (!formula.includes("Limit")) {
    let expression = formula;
    while (endsWithOperator.test(expression)) {
      expression = expression.slice(0, -1);
    }
    expression = expression.replace(/x/g, "*").replace(/-/g, "-").replace("--", "-");
    
    try {
      let answer = Function(`'use strict'; return (${expression})`)();
      answer = Math.round(answer * 1e12) / 1e12;
      
      this.setState({
        output: answer.toString(),
        formula: expression.replace(/\*/g, "⋅").replace(/-/g, "-").replace(/(x|\/|\+)-/, "$1-").replace(/^-/, "-") + "=" + answer,
        previousVal: answer,
        calculationJustPerformed: true
      });
    } catch (error) {
      this.setState({
        output: "Error",
        formula: "Error",
        previousVal: null,
        calculationJustPerformed: true
      });
    }
  }
};

handleOperators = (newOperator) => {
  const { formula, output, calculationJustPerformed } = this.state;

  let newFormula;
  if (calculationJustPerformed) {
    newFormula = output + newOperator;
  } else {
    if (newOperator === '-' && !endsWithNegativeSign.test(formula)) {
      newFormula = formula + newOperator;
    } else {
      newFormula = formula.replace(/[+\-x/]+$/, '') + newOperator;
    }
  }

  this.setState({
    formula: newFormula,
    operator: newOperator,
    output: newOperator,
    calculationJustPerformed: false
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

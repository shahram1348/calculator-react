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
    
    const cleanFormula = formula.replace(/[+\-x/]$/, '');
    const tokens = cleanFormula.match(/(-?\d+\.?\d*)|([+\-x/])/g) || [];
    
    const calculate = (tokens) => {
      const operators = ['x', '/', '+', '-'];
      
      for (let op of operators) {
        for (let i = 0; i < tokens.length; i++) {
          if (tokens[i] === op) {
            const left = parseFloat(tokens[i - 1]);
            const right = parseFloat(tokens[i + 1]);
            const result = this.performOperation(left, right, op);
            tokens.splice(i - 1, 3, result.toString());
            i -= 2;
          }
        }
      }
      
      return parseFloat(tokens[0]);
    };
  
    const result = calculate(tokens);
  
    this.setState({
      formula: result.toString(),
      output: result.toString(),
      previousVal: null,
      operator: null,
      calculationJustPerformed: true
    });
  };
  
handleOperators = (newOperator) => {
  const { formula, operator } = this.state;

  // Check if the new operator is a minus sign and the last character isn't already a minus
  if (newOperator === '-' && formula.slice(-1) !== '-') {
    this.setState({
      formula: formula + newOperator,
      operator: newOperator
    });
  } else {
    // Remove any trailing operators (except a single minus sign)
    let newFormula = formula.replace(/[+x/]-?$|[-+x/]$/, '');
    
    // Add the new operator
    newFormula += newOperator;

    this.setState({
      formula: newFormula,
      operator: newOperator,
      output: newOperator
    });
  }
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

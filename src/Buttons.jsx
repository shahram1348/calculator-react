import React from "react";

class Buttons extends React.Component {
  render() {
    const { initialize, operators, numbers, evaluate } = this.props;
    return (
      <div className="buttons">
        <button id="clear" onClick={initialize} value="AC">
          AC
        </button>
        <button id="divide" onClick={() => operators("/")} value="/">
          /
        </button>
        <button id="multiply" onClick={() => operators("x")} value="x">
          x
        </button>
        <button id="subtract" onClick={() => operators("-")} value="-">
          -
        </button>
        <button id="add" onClick={() => operators("+")} value="+">
          +
        </button>
        <button id="decimal" onClick={() => numbers(".")} value=".">
          .
        </button>
        <button id="equals" onClick={evaluate} value="=">
          =
        </button>
        <button id="one" onClick={() => numbers("1")} value="1">
          1
        </button>
        <button id="two" onClick={() => numbers("2")} value="2">
          2
        </button>
        <button id="three" onClick={() => numbers("3")} value="3">
          3
        </button>
        <button id="four" onClick={() => numbers("4")} value="4">
          4
        </button>
        <button id="five" onClick={() => numbers("5")} value="5">
          5
        </button>
        <button id="six" onClick={() => numbers("6")} value="6">
          6
        </button>
        <button id="seven" onClick={() => numbers("7")} value="7">
          7
        </button>
        <button id="eight" onClick={() => numbers("8")} value="8">
          8
        </button>
        <button id="nine" onClick={() => numbers("9")} value="9">
          9
        </button>
        <button id="zero" onClick={() => numbers("0")} value="0">
          0
        </button>
      </div>
    );
  }
}

export default Buttons;

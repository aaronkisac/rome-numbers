import React, { Component } from "react";
import "./InputNumber.css";
class InputNumber extends Component {
  state = {
    number: 0,
    result: "",
    message: "",
    romen: "",
    numberOfRomen: 0
  };

  handleOnchange = e => {
    const number = e.target.value;
    this.setState({ number });
  };

  numberToRomen = async number => {
    console.log(number);
    if (number >= 4000 || number <= 0) {
      await this.setState({
        message: "Please enter the number between 1 to 3999"
      });
    } else {
      await this.setState({ message: "Succesfull" });
      let numberDigits = { thousands: 0, hundreds: 0, tens: 0, ones: 0 };
      numberDigits.thousands = Math.floor(number / 1000) % 10;
      numberDigits.hundreds = Math.floor(number / 100) % 10;
      numberDigits.tens = Math.floor(number / 10) % 10;
      numberDigits.ones = number % 10;
      let romenDigits = { thousands: "", hundreds: "", tens: "", ones: "" };
      if (numberDigits.thousands !== 0) {
        if (numberDigits.thousands < 4) {
          for (let i = 0; i < numberDigits.thousands; i++) {
            romenDigits.thousands += "M";
          }
        }
      }

      if (numberDigits.hundreds !== 0) {
        if (numberDigits.hundreds < 4) {
          for (let i = 0; i < numberDigits.hundreds; i++) {
            romenDigits.hundreds += "C";
          }
        } else if (numberDigits.hundreds === 4) {
          romenDigits.hundreds += "CD";
        } else if (numberDigits.hundreds === 5) {
          romenDigits.hundreds += "D";
        } else if (numberDigits.hundreds === 9) {
          romenDigits.hundreds += "CM";
        } else if (numberDigits.hundreds > 5 && numberDigits.hundreds < 9) {
          romenDigits.hundreds += "D";
          for (let i = 5; i < numberDigits.hundreds; i++) {
            romenDigits.hundreds += "C";
          }
        }
      }
      if (numberDigits.tens !== 0) {
        if (numberDigits.tens < 4) {
          for (let i = 0; i < numberDigits.tens; i++) {
            romenDigits.tens += "X";
          }
        } else if (numberDigits.tens === 4) {
          romenDigits.tens += "XL";
        } else if (numberDigits.tens === 5) {
          romenDigits.tens += "L";
        } else if (numberDigits.tens === 9) {
          romenDigits.tens += "XC";
        } else if (numberDigits.tens > 5 && numberDigits.tens < 9) {
          romenDigits.tens += "L";
          for (let i = 5; i < numberDigits.tens; i++) {
            romenDigits.tens += "X";
          }
        }
      }

      if (numberDigits.ones !== 0) {
        if (numberDigits.ones < 4) {
          for (let i = 0; i < numberDigits.ones; i++) {
            romenDigits.ones += "I";
          }
        } else if (numberDigits.ones === 4) {
          romenDigits.ones += "IV";
        } else if (numberDigits.ones === 5) {
          romenDigits.ones += "V";
        } else if (numberDigits.ones === 9) {
          romenDigits.ones += "IX";
        } else if (numberDigits.ones > 5 && numberDigits.ones < 9) {
          romenDigits.ones += "V";
          for (let i = 5; i < numberDigits.ones; i++) {
            romenDigits.ones += "I";
          }
        }
      }
      console.log(numberDigits);
      console.log(romenDigits);
      const result =
        romenDigits.thousands +
        romenDigits.hundreds +
        romenDigits.tens +
        romenDigits.ones;
      this.setState({ result });
    }
    await console.log(this.state.message);
  };

  onSubmit = async e => {
    e.preventDefault();
    const number = this.state.number;
    this.numberToRomen(number);
    this.setState({ number: 0 });
  };

  handleOnchange2 = e => {
    const romen = e.target.value;
    this.setState({ romen });
  };

  romenToNumber = romen => {
    let romeNumbers = [
      { romen: "I", number: 1 },
      { romen: "V", number: 5 },
      { romen: "X", number: 10 },
      { romen: "L", number: 50 },
      { romen: "C", number: 100 },
      { romen: "D", number: 500 },
      { romen: "M", number: 1000 }
    ];
    let irregularOfRomenNumbers = [
      { romen: "IV", number: 4 },
      { romen: "IX", number: 9 },
      { romen: "XL", number: 50 },
      { romen: "XC", number: 90 },
      { romen: "CD", number: 400 },
      { romen: "CM", number: 900 }
    ];
    const even = romenNumber => {
      return romen.includes(romenNumber.romen);
    };
    let numberOfRomen = 0;
    if (irregularOfRomenNumbers.some(even)) {
      for (let index in irregularOfRomenNumbers) {
        if (romen.includes(irregularOfRomenNumbers[index].romen)) {
          numberOfRomen += irregularOfRomenNumbers[index].number;
          romen=romen.replace(irregularOfRomenNumbers[index].romen, "");
          console.log(romen);
        }
      }
    }
    if (romeNumbers.some(even)) {
      for (let index in romeNumbers) {
        const cashRomenNumber = romeNumbers[index].romen;
        const cashNumberOfRomenNumber = romeNumbers[index].number;
        let i=1;
        while (romen.includes(cashRomenNumber)&&i<=3)  {
        numberOfRomen += cashNumberOfRomenNumber;
        romen=romen.replace(cashRomenNumber, "");
        console.log(cashRomenNumber, "=", romen);
        i++;
        }
      }
    }

    this.setState({ numberOfRomen });
  };

  onSubmit2 = async e => {
    e.preventDefault();
    const romen = this.state.romen;
    this.romenToNumber(romen);
    this.setState({ romen: "" });
  };

  render() {
    return (
      <div className="Input">
        <form>
          <div className="form-group">
            <label className="control-label" htmlFor="name">
              Enter your number in box.
            </label>
          </div>

          <input
            className="InputNumber"
            type="number"
            name="number"
            id="number"
            onChange={e => this.handleOnchange(e)}
            value={this.state.number}
          />
          <button
            type="submit"
            className="button"
            onClick={e => this.onSubmit(e)}
          >
            Submit
          </button>
        </form>
        <h1>{this.state.result}</h1>
        <form>
          <div className="form-group">
            <label className="control-label" htmlFor="name">
              Enter your Romen number in box.
            </label>
          </div>

          <input
            className="InputRomenNumber"
            type="text"
            name="text"
            id="text"
            onChange={e => this.handleOnchange2(e)}
            value={this.state.romen}
          />
          <button
            type="submit"
            className="button2"
            onClick={e => this.onSubmit2(e)}
          >
            Submit
          </button>
        </form>
        <h1>{this.state.numberOfRomen}</h1>
      </div>
    );
  }
}
export default InputNumber;

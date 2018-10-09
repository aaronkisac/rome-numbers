import React, { Component } from "react";
import "./InputNumber.css";
class InputNumber extends Component {
  state = {
    number: 0,
    result:""
  };
  handleOnchange = e => {
    const number = e.target.value;
    this.setState({ number });
  };
  numberToRomen=number=>{
    console.log(number);
  }
  onSubmit = async e => {
    e.preventDefault();
    const number = this.state.number;
    this.numberToRomen(number);
    this.setState({ number:0 });
    }
  render() {
    return (
      <div className="Input">
        <form >
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
      </div>
    );
  }
}
export default InputNumber;

import React from "react";
import { Button, TextField, InputAdornment } from "@material-ui/core";
import chineseLabels from "./content/label.cn.json";
import englishLabels from "./content/label.en.json";
import "./App.css";
import { DoubleDown } from "./content/doubleDown/doubleDownCalculate.js";
import generate from "@babel/generator";

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      base: 3000,
      iteration: 100,
      purchaseLimit: 20000,
      startPurchaseAmount: 200,
      target: 32000,
      labels: chineseLabels,
      hasResult: false,
      result: []
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.labels.header}</p>
        </header>
        <this.TextFieldSection />
        <this.CalculateButton />
        {this.state.hasResult ? <this.Result /> : null}
      </div>
    );
  }

  CalculateButton = () => {
    return (
      <Button onClick={this.onPressCalculateButton}>
        <p>{this.state.labels.calculateButton}</p>
      </Button>
    );
  };

  onPressCalculateButton = () => {
    const {
      base,
      iteration,
      purchaseLimit,
      startPurchaseAmount,
      target
    } = this.state;
    let result = [];
    for (let i = 0; i < iteration; i++) {
      let doubleDownAlgorithm = new DoubleDown(
        base,
        purchaseLimit,
        startPurchaseAmount,
        target
      );
      result.push(doubleDownAlgorithm.calculate());
    }
    this.setState({
      hasResult: true,
      result
    });
  };

  Result = () => {
    let displayResult = this.generateResultItem(this.state.result[0]);
    return (
      <div>
        <h1>結果</h1>
        {displayResult}
      </div>
    );
  };

  generateResultItem(item) {
    console.log(item);
    return (
      <div className="Result-item-container">
        <p>{item.win ? "win" : "lose"} </p>
        <p>Balance: ${item.currentBalance} </p>
        <p>Game Play {item.gamePlay} </p>
        <p>{item.gameWin} </p>
        <p>{item.gameLost} </p>
        <p>{item.threeTheSame} </p>
        <p>{item.highestDouble} </p>
      </div>
    );
  }

  setLanguage(language) {
    let labels = this.getLabels(language);
    this.setState({
      labels
    });
  }

  getLabels(language) {
    switch (language) {
      case "chinese":
        return chineseLabels;
      case "english":
        return englishLabels;
      default:
        return chineseLabels;
    }
  }

  TextFieldSection = () => {
    let labels = this.state.labels.inputTextFields;
    const textFieldsValues = [
      {
        startAdornment: "$",
        name: "base",
        label: labels.base
      },
      {
        startAdornment: "$",
        name: "purchaseLimit",
        label: labels.purchaseLimit,
        defaulValue: 0
      },
      {
        startAdornment: "$",
        name: "startPurchaseAmount",
        label: labels.startPurchaseAmount,
        defaulValue: 0
      },
      {
        startAdornment: "$",
        name: "target",
        label: labels.target,
        defaulValue: 0
      },
      {
        startAdornment: "",
        name: "iteration",
        label: labels.iteration,
        defaulValue: 1
      }
    ];
    return textFieldsValues.map((item, index) => {
      return (
        <div className="Text-field-container">
          <div className={"Text-field-label-container"}>{item.label}</div>
          <TextField
            key={index}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {item.startAdornment}
                </InputAdornment>
              )
            }}
            name={item.name}
            onChange={event => this.onChangeTextField(event)}
            placeholder={item.defaulValue}
          ></TextField>
        </div>
      );
    });
  };

  onChangeTextField(textField) {
    let { name, value } = textField.target;
    this.setState({
      [name]: value
    });
  }
}

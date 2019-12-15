import React from "react";
import { Button, TextField, InputAdornment } from "@material-ui/core";
import chineseLabels from "./content/label.cn.json";
import englishLabels from "./content/label.en.json";
import "./App.css";
import { DoubleDown } from "./doubleDown/doubleDownCalculate";
import SicBoTable from "./table/table.js";

const VERSION = "V1.0.0";
const EMAIL = "pkkwilliam919@gmail.com";

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      base: 3000,
      iteration: 10,
      purchaseLimit: 20000,
      startPurchaseAmount: 200,
      target: 3200,
      labels: chineseLabels,
      hasResult: false,
      result: [],
      winCount: 0,
      loseCount: 0
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
      <Button
        color="primary"
        onClick={this.onPressCalculateButton}
        variant="contained"
        style={{ margin: 15 }}
      >
        {this.state.labels.calculateButton}
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
    let winCount = 0;
    let loseCount = 0;
    for (let i = 0; i < iteration; i++) {
      let doubleDownAlgorithm = new DoubleDown(
        base,
        purchaseLimit,
        startPurchaseAmount,
        target
      );
      let gameResult = doubleDownAlgorithm.calculate();
      if (gameResult.win) {
        winCount++;
      } else {
        loseCount++;
      }
      result.push(gameResult);
    }
    this.setState({
      hasResult: true,
      result,
      winCount,
      loseCount
    });
  };

  Result = () => {
    return (
      <div>
        <h1>結果</h1>
        <this.AbstractResult />
        <SicBoTable result={this.state.result} />
      </div>
    );
  };

  AbstractResult = () => {
    let { winCount, loseCount } = this.state;
    return (
      <div className={"Result-win-rate-container"}>
        <p>{`贏/場: ${winCount} `}</p>
        <p>{`輸/場: ${loseCount} `}</p>
        <p>{`勝率: ${(winCount / (winCount + loseCount)) * 100}%`}</p>
      </div>
    );
  };

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
    let {
      base,
      purchaseLimit,
      startPurchaseAmount,
      target,
      iteration
    } = this.state;
    const textFieldsValues = [
      {
        startAdornment: "$",
        name: "base",
        label: labels.base,
        defaultValue: base
      },
      {
        startAdornment: "$",
        name: "purchaseLimit",
        label: labels.purchaseLimit,
        defaultValue: purchaseLimit
      },
      {
        startAdornment: "$",
        name: "startPurchaseAmount",
        label: labels.startPurchaseAmount,
        defaultValue: startPurchaseAmount
      },
      {
        startAdornment: "$",
        name: "target",
        label: labels.target,
        defaultValue: target
      },
      {
        startAdornment: "",
        name: "iteration",
        label: labels.iteration,
        defaultValue: iteration
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
            placeholder={item.defaultValue}
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

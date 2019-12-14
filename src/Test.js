import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export default class Test extends React.Component {
  render() {
    console.log(JSON.stringify(this.props.match.params.id), ">>>>>>");
    return (
      <div>
        <p>This is Test Page</p>
        <p>Id: {this.props.match.params.id.name}</p>
      </div>
    );
  }
}

import React, { Component } from "react";
import {
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody
} from "@material-ui/core";

export default class SicBoTable extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <Paper>
        <div>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {this.getColumns().map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.result.map((row, index) => {
                return (
                  <TableRow>
                    {this.getColumns().map(column => {
                      const value =
                        column.id === "gameNumber" ? index + 1 : row[column.id];
                      return (
                        <TableCell align={column.align}>
                          {column.format(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }

  getColumns() {
    let columns = [
      { name: "gameNumber", label: "場", format: value => value },
      { name: "win", label: "結果", format: value => (value ? "贏" : "輸") },
      { name: "currentBalance", label: "餘額", format: value => `$${value}` },
      { name: "gamePlay", label: "次數", format: value => value },
      { name: "gameWin", label: "贏/場", format: value => value },
      { name: "gameLost", label: "輸/場", format: value => value },
      { name: "threeTheSame", label: "圍骰/場", format: value => value },
      {
        name: "highestDouble",
        label: "最高雙倍",
        format: value => `$${value}`
      },
      { name: "highestWin", label: "最高贏", format: value => `$${value}` },
      { name: "highestLose", label: "最高輸", format: value => `$${value}` }
    ];
    return columns.map(column => {
      return {
        id: column.name,
        label: column.label,
        minWidth: "auto",
        align: "center",
        format: column.format
      };
    });
  }
}

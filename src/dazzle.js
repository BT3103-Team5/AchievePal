import React, { Component } from "react";
import Dashboard from "react-dazzle";

// Your widget. Just another react component.
import CounterWidget from "./widgets/CounterWidget";

// Default styles.
import "react-dazzle/lib/style/style.css";

class Dazzle extends Component {
  constructor() {
    super();
    this.state = {
      widgets: {
        WordCounter: {
          type: CounterWidget,
          title: "Counter widget"
        }
      },
      layout: {
        rows: [
          {
            columns: [
              {
                className: "col-md-12",
                widgets: [{ key: "WordCounter" }]
              }
            ]
          }
        ]
      }
    };
  }

  render() {
    return (
      <Dashboard widgets={this.state.widgets} layout={this.state.layout} />
    );
  }
}

export default Dazzle;

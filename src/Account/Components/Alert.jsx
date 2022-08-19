import React from "react";
import { Component } from "react";

export class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, message } = this.props;
    return (
      <>
          <div className={`alert alert-${type} alert-dismissible fade in`}>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <strong>Error:</strong> {message}
          </div>
      </>
    );
  }
}

import React from "react";
import { Component } from "react";

export class ErrorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { message } = this.props;
        return(
            <>
             <p className="text-danger" style={{ marginTop: "0.5rem" }}>{message}</p>
            </>
        )
    }
}
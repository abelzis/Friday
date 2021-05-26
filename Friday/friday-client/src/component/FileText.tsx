import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

interface IProps {
    filename: string;
    onClickAction: Function;
}

export default class FileText extends Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <ListGroup.Item action onClick={this.props.onClickAction.bind(this)}>
                {this.props.filename}
            </ListGroup.Item>
        );
    }
}

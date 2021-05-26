/// <reference path="../../node_modules/react-json-editor-ajrm/locale/en.js" />

import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import JSONInput from "react-json-editor-ajrm";
// import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import fileDownload from "js-file-download";

interface IProps {
    selectedItem: string;
}

interface IState {
    json: string;
    plainText: string;
    showAlert: boolean;
    alertStatus: string;
    alertMessage: string;
}

interface IColors {
    default?: string;
    string?: string;
    number?: string;
    colon?: string;
    keys?: string;
    keys_whiteSpace?: string;
    primitive?: string;
    error?: string;
    background?: string;
    background_warning?: string;
}

const editorColors: IColors = {
    default: "#0B5351",
    string: "#E7770D",
    number: "#F78E69",
    colon: "#157F1F",
    keys: "#4E8098",
    keys_whiteSpace: "#A27E6F",
    primitive: "#C94277",
    error: "#BB0A21",
    background: "#E8F4E1",
    background_warning: "#350811",
};

const example: any = {
    series: "123",
    number: "004",
    date: "2021-02-22",
    seller: {
        company: "UAB Geriausia Kompanija",
        address: "Gatvės g. 2, Vilnius",
        code: "1450054411",
        pvm_code: "1219919911",
        writer: "Vardaitis Pavardaitis",
    },
    buyer: {
        name: "Jonas Jonaitis",
        address: "Senoji gatvė 6, Kaunas",
        code: "112959511",
        pvm_code: "111000005",
    },
};

export default class DocScriptEditor extends Component<IProps, IState> {
    placeholder = example;

    constructor(props: IProps) {
        super(props);

        this.state = {
            json: JSON.stringify(this.placeholder),
            plainText: "",
            showAlert: false,
            alertStatus: "primary",
            alertMessage: "",
        };
    }

    handleInputChanged(e: any) {
        this.setState({
            json: e.json,
            plainText: e.plainText,
        });
    }

    handleButtonSubmit(e: any) {
        let postBody = {
            docName: this.props.selectedItem || "",
            docContents: JSON.parse(this.state.json!),
        };

        if (postBody.docName === "") {
            this.setState({
                alertStatus: "danger",
                showAlert: true,
                alertMessage: `Error: No file selected.`,
            });
            return;
        }

        fetch(`${process.env.REACT_APP_FRIDAY_API}JsonUpload`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postBody),
        })
            // .then((response) => response.json())
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        alertStatus: "success",
                        showAlert: true,
                        alertMessage: "Request successfully submited! Starting download...",
                    });

                    this.downloadGeneratedDoc();
                } else {
                    this.setState({
                        alertStatus: "danger",
                        showAlert: true,
                        alertMessage: `Error: ${res}`,
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    alertStatus: "danger",
                    showAlert: true,
                    alertMessage: `Error: ${err}`,
                });
            });
    }

    downloadGeneratedDoc() {
        fetch(`${process.env.REACT_APP_FRIDAY_API}JsonUpload?fileName=${encodeURIComponent(this.props.selectedItem)}`, {
            method: "GET",
            headers: {
                Accept: "application/octet-stream",
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.blob())
        .then((res) => fileDownload(res, this.props.selectedItem));
    }

    render() {
        return (
            <div className="mt-3">
                <span>Editor</span>
                <JSONInput id="json-editor" placeholder={this.placeholder} locale={locale} colors={editorColors} height="350px" width="800px" onChange={this.handleInputChanged.bind(this)} />
                <Button variant="primary" as="input" type="submit" value="Submit" onClick={this.handleButtonSubmit.bind(this)} />
                <Alert variant={this.state.alertStatus} show={this.state.showAlert}>
                    {this.state.alertMessage}
                </Alert>
            </div>
        );
    }
}

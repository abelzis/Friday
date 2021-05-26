import React, { Component } from "react";
import { Alert } from "react-bootstrap";

interface IProps {}

interface IState {
    file: string;
    showAlert: boolean;
    alertStatus: string;
    alertMessage: string;
}

export default class UploadFile extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            file: "",
            showAlert: false,
            alertStatus: "",
            alertMessage: "",
        };
    }

    onFileChange = (event: any) => {
        this.setState({
            file: event.target.files[0],
        });
    };

    uploadFileData = (event: any) => {
        event.preventDefault();
        this.setState({
            showAlert: false,
            alertMessage: "",
            alertStatus: "",
        });

        let data = new FormData();
        data.append("file", this.state.file);

        fetch(`${process.env.REACT_APP_FRIDAY_API}FileUpload`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                // "Content-Type": "multipart/form-data",
            },
            body: data,
        })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        showAlert: true,
                        alertStatus: "success",
                        alertMessage: "File successfully uploaded",
                    });
                } else {
                    this.setState({
                        showAlert: true,
                        alertStatus: "danger",
                        alertMessage: `Error: ${res}`,
                    });
                }
            })
            .catch((err: any) => {
                this.setState({
                    showAlert: true,
                    alertStatus: "danger",
                    alertMessage: err.message,
                });
            });
    };

    render() {
        return (
            <div id="upload-container">
                <div className="mt-2 d-flex justify-content-left">Template Generator</div>
                <Alert variant={this.state.alertStatus} show={this.state.showAlert}>
                    {this.state.alertMessage}
                </Alert>
                {/* <h4>{this.state.msg}</h4> */}
                <input type="file" onChange={this.onFileChange} />
                <button disabled={!this.state.file} onClick={this.uploadFileData}>
                    Upload
                </button>
            </div>
        );
    }
}

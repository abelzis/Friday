import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UploadFile from "src/component/UploadFile";
import FileList from "src/component/FileList";
import DocScriptEditor from "src/component/DocScriptEditor";

interface IProps {
    data: true;
}

interface IState {
    fileList: [];
    selectedFileListItem: string;
}

export default class TemplateGenerator extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            fileList: [],
            selectedFileListItem: "",
        };
    }

    changeFileList(list: []) {
        this.setState({
            fileList: list,
        });
    }

    onClickSelect(e: any) {
        this.setState({
            selectedFileListItem: e.target.innerText.toString(),
        });
    }

    render() {
        return (
            <div>
                <h2 className="mt-3 d-flex justify-content-left">Template Generator</h2>
                <Container fluid>
                    <Row>
                        <Col>
                            <UploadFile />
                            <DocScriptEditor selectedItem={this.state.selectedFileListItem}/>
                        </Col>
                        <Col xs={3}>
                            <span>
                                <strong>Files currently uploaded:</strong>
                            </span>
                            <FileList fileList={this.state.fileList} changeFileList={this.changeFileList.bind(this)} onClickSelect={this.onClickSelect.bind(this)} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

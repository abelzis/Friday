import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import FileText from "./FileText";

interface IGetFileListProps {
    fileList: [];
    changeFileList: Function;
    onClickSelect: Function;
}
interface IGetFileListState {}

export default class FileList extends Component<IGetFileListProps, IGetFileListState> {
    constructor(props: IGetFileListProps) {
        super(props);
    }

    getList() {
        fetch(`${process.env.REACT_APP_FRIDAY_API}FileUpload`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => this.props.changeFileList(data.fileList));
    }

    componentDidMount() {
        this.getList();
    }

    // componentDidUpdate() {
    //     this.getList();
    // }

    render() {
        const { fileList } = this.props;
        return (
            <ListGroup id="uploaded-file-list">
                {fileList.map((file: any) => (
                    <FileText filename={file.name} key={file.name} onClickAction={this.props.onClickSelect.bind(this)} />
                ))}
            </ListGroup>
        );
    }
}

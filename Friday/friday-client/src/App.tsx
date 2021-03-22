import React, { Component } from "react";
import Switch from "react-bootstrap/esm/Switch";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "./pages/HomePage";
import TemplateGenerator from "./pages/TemplateGenerator";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/template-generator" component={TemplateGenerator} exact />
                </Switch>
            </BrowserRouter>
        );
    }
}

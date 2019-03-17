import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
      <Route exact path="/" component={Home} />
      </React.Fragment>
            </BrowserRouter>
    );
  }
}

export default App;

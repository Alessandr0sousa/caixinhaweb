import React from 'react';
import Routes from "./routes";

import "./styles.css";

import Header from './components/Header';
import Loading from './components/loading';
const App = () => (
  <div className="App">
    {/* <Loading /> */}
    <Header />
    <Routes />
  </div>
);

export default App;

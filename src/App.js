import React from "react";
import { Button } from "antd";
import "./App.css";
import { StoreProvider } from "easy-peasy";
import store from "./store/index";
import HomeScreen from "./screens/home";

const App = () => (
  <StoreProvider store={store}>
    <div className="App">
      <HomeScreen></HomeScreen>
    </div>
  </StoreProvider>
);

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <FluentProvider theme={teamsLightTheme}>
          <App />
        </FluentProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import * as Mui from "@material-ui/core";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux";

const theme = Mui.createTheme({
  palette: {
    primary: {
      main: "#4e087d",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Mui.MuiThemeProvider theme={theme}>
      <App />
    </Mui.MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

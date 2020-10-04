import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./redux/configureStore";
import Main from "./components/MainComponent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="md" style={{ paddingTop: "30px" }}>
          <Main></Main>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

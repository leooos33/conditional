import React from "react";
import { Footer } from "./components/Footer";

import { Header } from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SwapPage } from "./pages/SwapPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/swap" />
          </Route>
          <Route path="/swap">
            <SwapPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

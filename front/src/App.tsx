import { Footer } from "./components/Footer";
import { Provider } from "react-redux";
import { Header } from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SwapPage } from "./pages/SwapPage";
import { store } from "./redux/store";
import MintPage from "./pages/MintPage";
import OrderPage from "./pages/OrderPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
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
            <Route path="/mint">
              <MintPage />
            </Route>
            <Route path="/order">
              <OrderPage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

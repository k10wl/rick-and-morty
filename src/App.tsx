import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Characters from "./pages/Characters";
import Episodes from "./pages/Episodes";
import Locations from "./pages/Locations";
import MyWatchList from "./pages/MyWatchList";
import StoreDataInRedux from "./customHooks/StoreDataInRedux";

function App() {
  const [charLoaded, locLoaded] = StoreDataInRedux();
  if (!charLoaded && !locLoaded) {
    return <h1>LOADING</h1>;
  }
  return (
    <Router>
      <ul>
        <li>
          <Link to="/"> Characters </Link>
        </li>
        <li>
          <Link to="episodes"> Episodes </Link>
        </li>
        <li>
          <Link to="locations"> Locations </Link>
        </li>
        <li>
          <Link to="watchlist"> WatchList </Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Characters} />
        <Route exact path="/episodes" component={Episodes} />
        <Route exact path="/locations" component={Locations} />
        <Route exact path="/watchlist" component={MyWatchList} />
      </Switch>
    </Router>
  );
}

export default App;

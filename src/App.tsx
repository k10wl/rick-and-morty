import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Characters from "./pages/Characters";
import Episodes from "./pages/Episodes";
import Locations from "./pages/Locations";
import MyWatchList from "./pages/MyWatchList";
import StoreDataInRedux from "./customHooks/StoreDataInRedux";

function App() {
  StoreDataInRedux();
  // @ts-ignore
  const { pages } = useSelector((store) => store);
  console.log(pages);
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

import React from "react";
import * as Mui from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Characters from "./pages/Characters";
import Episodes from "./pages/Episodes";
import Locations from "./pages/Locations";
import MyWatchList from "./pages/MyWatchList";
import StoreDataInRedux from "./customHooks/StoreDataInRedux";
import Header from "./Components/Header";

function App() {
  const [charLoaded, locLoaded] = StoreDataInRedux();
  if (!charLoaded && !locLoaded) {
    return <h1>LOADING</h1>;
  }
  return (
    <Router>
      <Mui.Grid container direction="column">
        <Header />
        <Switch>
          <Route exact path="/" component={Characters} />
          <Route exact path="/episodes" component={Episodes} />
          <Route exact path="/locations" component={Locations} />
          <Route exact path="/watchlist" component={MyWatchList} />
        </Switch>
      </Mui.Grid>
    </Router>
  );
}

export default App;

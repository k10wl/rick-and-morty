import React from "react";
import * as Mui from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Characters from "./pages/Characters";
import Episodes from "./pages/Episodes";
import Locations from "./pages/Locations";
import MyWatchList from "./pages/MyWatchList";
import StoreDataInRedux from "./customHooks/StoreDataInRedux";
import Header from "./Components/Header";
import background from "./media/rick-and-morty-background-3.jpg";
import loadingGif from "./media/portal.gif";
import FetchData from "./customHooks/FetchData";
import { storePages } from "./redux/pages";

function App() {
  const [charLoaded, locLoaded] = StoreDataInRedux();
  const { loaded: charPageLoaded, data: charData } = FetchData(
    "https://rickandmortyapi.com/api/character"
  );
  const { loaded: locPageLoaded, data: locData } = FetchData(
    "https://rickandmortyapi.com/api/location"
  );
  const { loaded: episodePageLoaded, data: epData } = FetchData(
    "https://rickandmortyapi.com/api/episode"
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(storePages({ category: "characters", pageData: charData }));
  }, [charPageLoaded]);
  React.useEffect(() => {
    dispatch(storePages({ category: "locations", pageData: locData }));
  }, [locPageLoaded]);
  React.useEffect(() => {
    dispatch(storePages({ category: "episodes", pageData: epData }));
  }, [episodePageLoaded]);

  const showLoading =
    !charLoaded ||
    !locLoaded ||
    !locPageLoaded ||
    !charPageLoaded ||
    !episodePageLoaded ||
    !background;

  if (showLoading) {
    return (
      <Mui.Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
        direction="column"
      >
        <img src={loadingGif} alt="loading" style={{ height: "50vh" }} />
        <Mui.Typography variant="h3">Loading...</Mui.Typography>
        <Mui.Typography variant="h3">Please wait</Mui.Typography>
      </Mui.Grid>
    );
  }

  return (
    <Router>
      <Header />
      <Mui.Grid
        container
        style={{
          minHeight: "100vh",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${background})`,
        }}
        justifyContent="center"
      >
        <Mui.Grid item sm>
          <Mui.Box height="100%" />
        </Mui.Grid>
        <Mui.Grid container item direction="column" sm={10}>
          <Switch>
            <Route exact path="/" component={Characters} />
            <Route exact path="/episodes" component={Episodes} />
            <Route exact path="/locations" component={Locations} />
            <Route exact path="/watchlist" component={MyWatchList} />
          </Switch>
        </Mui.Grid>
        <Mui.Grid item sm>
          <Mui.Box height="100%" />
        </Mui.Grid>
      </Mui.Grid>
    </Router>
  );
}

export default App;

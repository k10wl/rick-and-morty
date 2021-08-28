import * as React from "react";
import * as Mui from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const [tabsValue, setTabsValue] = React.useState<string>("/");
  const [forceUpdate, setForceUpdate] = React.useState<boolean>(false);
  React.useEffect(() => {
    setTabsValue(history.location.pathname);
  }, [forceUpdate]);
  return (
    <Mui.AppBar
      position="static"
      style={{ margin: "0", backgroundColor: "#4e087d" }}
    >
      <Mui.Toolbar variant="dense">
        <Mui.Grid container item sm={12} md justifyContent="center">
          <Mui.Tabs value={tabsValue}>
            <Mui.Tab
              value="/"
              label="Characters"
              component={Link}
              to="/"
              onClick={() => setForceUpdate(!forceUpdate)}
            />
            <Mui.Tab
              value="/episodes"
              label="Episodes"
              component={Link}
              to="/episodes"
              onClick={() => setForceUpdate(!forceUpdate)}
            />
            <Mui.Tab
              value="/locations"
              label="Locations"
              component={Link}
              to="/locations"
              onClick={() => setForceUpdate(!forceUpdate)}
            />
            <Mui.Tab
              value="/watchlist"
              label="toWatch"
              component={Link}
              to="/watchlist"
              onClick={() => setForceUpdate(!forceUpdate)}
            />
          </Mui.Tabs>
        </Mui.Grid>
      </Mui.Toolbar>
    </Mui.AppBar>
  );
}

export default Header;

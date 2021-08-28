import * as React from "react";
import * as Mui from "@material-ui/core";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Mui.AppBar position="static" style={{ margin: "0" }}>
      <Mui.Grid md={6}>
        <Mui.Toolbar variant="dense">
          <Mui.Tab
            label="Characters"
            component={Link}
            to="/"
            style={{ width: "50px" }}
          />
          <Mui.Tab label="Episodes" component={Link} to="/episodes" />
          <Mui.Tab label="Locations" component={Link} to="/locations" />
          <Mui.Tab label="toWatch" component={Link} to="/watchlist" />
        </Mui.Toolbar>
      </Mui.Grid>
    </Mui.AppBar>
  );
}

export default Header;

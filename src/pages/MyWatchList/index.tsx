import * as React from "react";
import * as Mui from "@material-ui/core";

type Props = {};

function MyWatchList(props: Props) {
  console.log(props);
  return (
    <>
      <form>
        <Mui.TextField label="To watch" />
        <Mui.Button>Add ToWatch</Mui.Button>
      </form>
      <h1>MyWatchList</h1>
    </>
  );
}

export default MyWatchList;

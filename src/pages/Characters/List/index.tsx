import * as React from "react";
import * as Mui from "@material-ui/core";

function List({ array }: { array: string[] }) {
  return (
    <Mui.Grid
      item
      xs={3}
      style={{ overflowY: "scroll", overflowX: "hidden", height: "100vh" }}
    >
      {array.map((el, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={`${el}${i}`}>{el}</p>
      ))}
    </Mui.Grid>
  );
}

export default List;

import * as Mui from "@material-ui/core";

const MyTableCell = Mui.withStyles((theme) => ({
  head: {
    backgroundColor: "#4e087d",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(Mui.TableCell);

export default MyTableCell;

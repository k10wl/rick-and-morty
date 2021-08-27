import * as Mui from "@material-ui/core";

const MyTableCell = Mui.withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(Mui.TableCell);

export default MyTableCell;

import * as Mui from "@material-ui/core";

const MyPopover = Mui.withStyles(() => ({
  paper: {
    borderRadius: "30px",
    padding: "10px",
  },
}))(Mui.Popover);

export default MyPopover;

import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      width: "300px",
      height: "400px",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    defaultCursor: {
      cursor: "default",
    },
  })
);

export default useStyles;

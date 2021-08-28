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
    task: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      position: "relative",
      marginLeft: "15px",
      "&:before": {
        content: "''",
        width: "10px",
        height: "10px",
        borderRadius: "10px",
        marginRight: "10px",
        position: "absolute",
        left: "-20px",
      },
    },
    taskCompleted: {
      textDecoration: "line-through",
      color: "grey",
      "&:before": {
        backgroundColor: "grey",
      },
    },
    taskPending: {
      "&:before": {
        backgroundColor: "green",
      },
    },
  })
);

export default useStyles;

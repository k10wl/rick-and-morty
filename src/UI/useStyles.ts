import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    tabRoot: {
      padding: "25px 0",
      backgroundColor: "white",
    },
    card: {
      width: "300px",
      height: "400px",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
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
    imageRoot: {
      display: "flex",
      width: "300px",
      height: "364px",
      margin: "10px",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      flexFlow: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    image: {
      height: "268px",
      borderRadius: "20px",
    },
    info: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    popoverRadius: {
      borderRadius: "30px",
    },
    popoverRoot: {
      width: "500px",
      padding: "0 7px",
    },
    popoverImg: {
      width: "150px",
      height: "150px",
    },
    popoverEpisodes: {
      border: "1px solid gray",
      padding: "5px",
      borderRadius: "5px",
      "&:hover": {
        cursor: "default",
      },
    },
  })
);

export default useStyles;

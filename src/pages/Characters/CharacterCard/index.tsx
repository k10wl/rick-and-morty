import * as React from "react";
import * as Mui from "@material-ui/core";

type Props = {
  image: string;
  name: string;
  status: string;
};

const useStyles = Mui.makeStyles((theme) => ({
  root: {
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
}));

function CharacterCard({ image, name, status }: Props) {
  const classes = useStyles();
  return (
    <Mui.Card className={classes.root}>
      <Mui.CardActionArea>
        <div className={classes.details}>
          <Mui.CardContent className={classes.content}>
            <Mui.CardMedia
              component="img"
              image={image}
              title={name}
              className={classes.image}
            />
            <div className={classes.info}>
              <Mui.Typography>Name: {name}</Mui.Typography>
              <Mui.Typography>Status: {status}</Mui.Typography>
            </div>
          </Mui.CardContent>
        </div>
      </Mui.CardActionArea>
    </Mui.Card>
  );
}

export default CharacterCard;

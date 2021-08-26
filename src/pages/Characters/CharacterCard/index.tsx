import * as React from "react";
import * as Mui from "@material-ui/core";
import useStyles from "../../../UI/useStyles";

type Props = {
  image: string;
  name: string;
  status: string;
};

function CharacterCard({ image, name, status }: Props) {
  const classes = useStyles();
  return (
    <Mui.Card className={classes.card}>
      <Mui.CardActionArea>
        <Mui.CardMedia component="img" image={image} title="rick_img" />
        <Mui.CardContent>
          <Mui.Typography>Name: {name}</Mui.Typography>
          <Mui.Typography>Status: {status}</Mui.Typography>
        </Mui.CardContent>
      </Mui.CardActionArea>
    </Mui.Card>
  );
}

export default CharacterCard;

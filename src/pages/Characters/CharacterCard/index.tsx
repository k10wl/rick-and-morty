import * as React from "react";
import * as Mui from "@material-ui/core";
import { Character } from "../../../types";
import useStyles from "../../../UI/useStyles";
import CharacterPassport from "./CharacterPassport";

function CharacterCard(props: Character) {
  const { image, name, status } = props;
  const classes = useStyles();
  const buttonRef = React.useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Mui.Card className={classes.imageRoot}>
      <Mui.CardActionArea onClick={handleClick} ref={buttonRef}>
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
      <CharacterPassport
        character={props}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </Mui.Card>
  );
}

export default CharacterCard;

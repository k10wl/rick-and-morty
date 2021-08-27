import * as React from "react";
import * as Mui from "@material-ui/core";
import { Character } from "../../../types";

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

function CharacterCard(props: Character) {
  const {
    image,
    name,
    status,
    species,
    gender,
    origin,
    location,
    episode,
    created,
  } = props;

  const displayEpisodes = episode.map((el) => {
    const result = el.match(/(\d*)$/gm);
    if (result) {
      return result.filter(Boolean);
    }
    return "";
  });
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
    <>
      <Mui.Card className={classes.root}>
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
      </Mui.Card>
      <Mui.Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Mui.Typography>Name: {name}</Mui.Typography>
        <Mui.Typography>Status: {status}</Mui.Typography>
        <Mui.Typography>Species: {species}</Mui.Typography>
        <Mui.Typography>Gender: {gender}</Mui.Typography>
        <Mui.Typography>Origin: {origin.name}</Mui.Typography>
        <Mui.Typography>location: {location.name}</Mui.Typography>
        <Mui.Typography>
          created: {String(created).match(/(\d{4})-(\d{2})-(\d{2})/gm)}
        </Mui.Typography>
        <Mui.Typography>episodes: {displayEpisodes.join(", ")}</Mui.Typography>
      </Mui.Popover>
    </>
  );
}

export default CharacterCard;

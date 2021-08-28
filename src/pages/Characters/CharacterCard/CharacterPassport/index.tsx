import * as React from "react";
import * as Mui from "@material-ui/core";
import { Character } from "../../../../types";
import useStyles from "../../../../UI/useStyles";

type Props = {
  character: Character;
  anchorEl: any;
  handleClose: () => void;
  open: boolean;
};

function CharacterPassport({ character, anchorEl, handleClose, open }: Props) {
  const classes = useStyles();
  const displayEpisodes = character.episode.map((el) => {
    const result = el.match(/(\d*)$/gm);
    if (result) {
      return result.filter(Boolean);
    }
    return "";
  });
  return (
    <Mui.Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      className={classes.popoverRadius}
    >
      <Mui.Grid className={classes.popoverRoot}>
        <Mui.Typography align="center" variant="h6">
          MULTI PASS
        </Mui.Typography>
        <Mui.Grid container direction="row" alignItems="center">
          <Mui.Grid>
            <img
              className={classes.popoverImg}
              src={character.image}
              alt={character.name}
            />
          </Mui.Grid>
          <Mui.Grid item xs style={{ paddingLeft: "5px" }}>
            <Mui.Grid
              container
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <Mui.Typography variant="body2">Name:</Mui.Typography>
              <Mui.Typography align="right">{character.name}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              container
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <Mui.Typography variant="body2">Species:</Mui.Typography>
              <Mui.Typography>{character.species}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              container
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <Mui.Typography variant="body2">Gender:</Mui.Typography>
              <Mui.Typography>{character.gender}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              container
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <Mui.Typography variant="body2">Origin:</Mui.Typography>
              <Mui.Typography>{character.origin.name}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              container
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <Mui.Typography variant="body2">Location:</Mui.Typography>
              <Mui.Typography>{character.location.name}</Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid container justifyContent="space-between">
          <Mui.Grid container direction="column" style={{ width: "150px" }}>
            <Mui.Grid
              container
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Mui.Typography variant="body2">Created:</Mui.Typography>
              <Mui.Typography>
                {String(character.created).match(/(\d{4})-(\d{2})-(\d{2})/gm)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              container
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Mui.Typography variant="body2">Status: </Mui.Typography>
              <Mui.Typography>
                {character.status === "Alive" && "Alive \u{1F7E2}"}
                {character.status === "Dead" && "Dead \u{1FAA6}"}
                {character.status === "unknown" && "unknown \u{2753}"}
              </Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid
            item
            xs
            style={{ paddingLeft: "10px" }}
            container
            alignItems="center"
            direction="column"
          >
            <Mui.Tooltip
              placement="top"
              title={
                <Mui.Typography>{displayEpisodes.join(", ")}</Mui.Typography>
              }
            >
              <Mui.Typography className={classes.popoverEpisodes}>
                Episodes
              </Mui.Typography>
            </Mui.Tooltip>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Popover>
  );
}

export default CharacterPassport;

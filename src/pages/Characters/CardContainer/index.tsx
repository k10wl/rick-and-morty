import * as React from "react";
import { Grid } from "@material-ui/core";
import * as Mui from "@material-ui/core";
import CharacterCard from "../CharacterCard";
import { Character } from "../../../types";

function CardContainer({ array }: { array: Character[] }) {
  return (
    <Mui.Grid item sm>
      <Mui.Grid
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        container
      >
        {array.map((el: Character) => (
          <Grid key={el.id} item>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <CharacterCard {...el} />
          </Grid>
        ))}
      </Mui.Grid>
    </Mui.Grid>
  );
}

export default CardContainer;

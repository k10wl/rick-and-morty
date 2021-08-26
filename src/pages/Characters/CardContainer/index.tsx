import * as React from "react";
import { Grid } from "@material-ui/core";
import * as Mui from "@material-ui/core";
import CharacterCard from "../CharacterCard";
import { Character } from "../../../types";

function CardContainer({ array }: { array: Character[] }) {
  return (
    <Mui.Grid
      container
      spacing={1}
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      {array.map(
        (el: { id: number; image: string; status: string; name: string }) => (
          <Grid key={el.id} item>
            <CharacterCard image={el.image} status={el.status} name={el.name} />
          </Grid>
        )
      )}
    </Mui.Grid>
  );
}

export default CardContainer;

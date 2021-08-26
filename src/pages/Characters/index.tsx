/* eslint-disable no-unused-vars */
import * as React from "react";
import * as Mui from "@material-ui/core";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import CharacterCard from "./CharacterCard";
import { Character } from "../../types";
import { DefaultRootState } from "../../redux";

function Characters() {
  const filtersInitialState = {
    species: "none",
    status: "none",
    gender: "none",
  };
  const [charFilters, setCharFilters] = React.useState(filtersInitialState);
  const { pages, filters } = useSelector((state: DefaultRootState) => state);
  const [currentPage, setCurrentPage] = React.useState(1);
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.value === "next") {
      setCurrentPage(currentPage + 1);
    } else if (e.currentTarget.value === "prev") {
      setCurrentPage(currentPage - 1);
    }
  }
  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setCharFilters({
      ...charFilters,
      [e.target.id]: e.target.value,
    });
  }
  return (
    <>
      <Mui.Grid container justify="center">
        <Typography>Characters</Typography>
      </Mui.Grid>
      <Mui.Grid>
        <Mui.Typography>Select filter option</Mui.Typography>
        <select
          onChange={handleSelect}
          id="species"
          value={charFilters.species}
        >
          <option value="none">none</option>
          {filters.characters.species.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <select onChange={handleSelect} id="status" value={charFilters.status}>
          <option value="none">none</option>
          {filters.characters.status.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <select onChange={handleSelect} id="gender" value={charFilters.gender}>
          <option value="none">none</option>
          {filters.characters.gender.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </Mui.Grid>
      <Mui.Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {pages.characters[currentPage - 1].map(
          (el: { id: number; image: string; status: string; name: string }) => (
            <Grid item>
              <CharacterCard
                key={el.id}
                image={el.image}
                status={el.status}
                name={el.name}
              />
            </Grid>
          )
        )}
      </Mui.Grid>
      <Mui.Grid container justify="center" alignItems="center">
        <Mui.Button
          value="prev"
          onClick={(e) => handleClick(e)}
          disabled={currentPage === 1}
        >
          prev
        </Mui.Button>
        <span>{currentPage}</span>
        <Mui.Button
          value="next"
          onClick={(e) => handleClick(e)}
          disabled={currentPage === pages.characters.length}
        >
          next
        </Mui.Button>
      </Mui.Grid>
    </>
  );
}

export default Characters;

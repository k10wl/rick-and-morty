import * as React from "react";
import * as Mui from "@material-ui/core";
import { useSelector } from "react-redux";
import CardContainer from "./CardContainer";
import { DefaultRootState } from "../../redux";
import { Character, InfoType } from "../../types";
import GetAllNames from "../../customHooks/GetAllNames";
import List from "./List";

function Characters() {
  const filtersInitialState = {
    species: "none",
    status: "none",
    gender: "none",
    page: 1,
  };
  // eslint-disable-next-line no-unused-vars
  const [filterResultsLoaded, setFilterResultsLoaded] = React.useState(false);
  const [charFilters, setCharFilters] = React.useState(filtersInitialState);
  const [customFilter, setCustomFilter] = React.useState(false);
  const [filteredChars, setFilteredChars] = React.useState<Character[]>([]);
  const [nextExists, setNextExists] = React.useState(true);
  const [customQuery, setCustomQuery] = React.useState("");
  const { pages, filters, names } = useSelector(
    (state: DefaultRootState) => state
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!customFilter) {
      if (e.currentTarget.value === "next") {
        setCurrentPage(currentPage + 1);
      } else if (e.currentTarget.value === "prev") {
        setCurrentPage(currentPage - 1);
      }
    }
    if (customFilter) {
      setCharFilters({
        ...charFilters,
        page:
          e.currentTarget.value === "next"
            ? charFilters.page + 1
            : charFilters.page - 1,
      });
    }
  }
  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setCharFilters({
      ...charFilters,
      [e.target.id]: e.target.value,
      page: 1,
    });
  }
  const { loaded, namesList: customNames } = GetAllNames(customQuery);

  React.useEffect(() => {
    if (pages.characters.length !== 0) {
      setFilterResultsLoaded(true);
    }
  });
  React.useEffect(() => {
    const { page, status, species, gender } = charFilters;
    const statusQuery = status !== "none" && `status=${status}`;
    const speciesQuery = species !== "none" && `species=${species}`;
    const genderQuery = gender !== "none" && `gender=${gender}`;
    const combineQuery = [statusQuery, speciesQuery, genderQuery]
      .filter(Boolean)
      .join("&");
    setCustomQuery(
      `https://rickandmortyapi.com/api/character/?${combineQuery}`
    );
    if (combineQuery) {
      setFilterResultsLoaded(false);
      fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}&&${combineQuery}`
      )
        .then((r) => r.json())
        .then(({ info, results }: { info: InfoType; results: Character[] }) => {
          if (!info) {
            setFilteredChars([]);
            setNextExists(false);
            setCurrentPage(1);
            setCustomFilter(true);
            setFilterResultsLoaded(true);
            return;
          }
          setFilteredChars(results);
          setNextExists(info.next !== null);
          setCurrentPage(page);
          setCustomFilter(true);
          setFilterResultsLoaded(true);
        });
    }
    if (combineQuery === "") {
      setFilteredChars([]);
      setCustomFilter(false);
    }
  }, [charFilters]);
  return (
    <>
      <Mui.Grid container justifyContent="center">
        <Mui.Typography>Characters</Mui.Typography>
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
      {loaded && filterResultsLoaded ? (
        <Mui.Grid container style={{ alignItems: "stretch" }} direction="row">
          <List array={customFilter ? customNames : names} />
          <CardContainer
            array={
              customFilter ? filteredChars : pages.characters[currentPage - 1]
            }
          />
        </Mui.Grid>
      ) : (
        <h1>Loading...</h1>
      )}
      <Mui.Grid container justifyContent="center" alignItems="center">
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
          disabled={currentPage === pages.characters.length || !nextExists}
        >
          next
        </Mui.Button>
      </Mui.Grid>
    </>
  );
}

export default Characters;

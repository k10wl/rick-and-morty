import * as React from "react";
import * as Mui from "@material-ui/core";
import { useSelector } from "react-redux";
import CardContainer from "./CardContainer";
import { DefaultRootState } from "../../redux";
import { Character, PageType } from "../../types";
import FetchData from "../../customHooks/FetchData";
import PaginationButtons from "../../Components/PaginationButtons";
import useStyles from "../../UI/useStyles";

type CharFilter = {
  species: string;
  status: string;
  gender: string;
};

function Characters() {
  const classes = useStyles();
  const defaultUrl = "https://rickandmortyapi.com/api/character";
  const [apiUrl, setApiUrl] = React.useState<string>(defaultUrl);
  const { pages } = useSelector((state: DefaultRootState) => state);
  const [apiData, setApiData] = React.useState<Character[]>(pages.characters);
  const [page, setPage] = React.useState<PageType>([null, null]);
  const defaultFiltersState: CharFilter = {
    species: "",
    status: "",
    gender: "",
  };
  const [selectedFilters, setSelectedFilters] =
    React.useState<CharFilter>(defaultFiltersState);

  const { filters } = useSelector((state: DefaultRootState) => state);

  const { loaded, data, prev, next } = FetchData(apiUrl);
  React.useEffect(() => {
    if (loaded) {
      setApiData(data as Character[]);
      setPage([prev, next]);
    }
  }, [loaded]);
  function handlePagination(url: string | null) {
    if (typeof url === "string") {
      setApiUrl(url);
    }
  }
  function handleFilterSelection(
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name as string]: e.target.value,
    });
  }
  React.useEffect(() => {
    const { species, status, gender } = selectedFilters;
    const speciesQuery = species !== "" && `species=${species}`;
    const statusQuery = status !== "" && `status=${status}`;
    const genderQuery = gender !== "" && `gender=${gender}`;
    const query = [speciesQuery, statusQuery, genderQuery]
      .filter(Boolean)
      .join("&");
    setApiUrl(`${defaultUrl}?${query}`);
  }, [selectedFilters]);

  return (
    <Mui.Grid className={classes.tabRoot}>
      <Mui.Grid container justifyContent="center">
        <Mui.Typography variant="h4">
          List of{" "}
          {selectedFilters.status !== "unknown"
            ? selectedFilters.status
            : `${selectedFilters.status} status`}{" "}
          {selectedFilters.species !== "unknown"
            ? selectedFilters.species
            : `${selectedFilters.species} species`}{" "}
          {selectedFilters.gender !== "unknown"
            ? selectedFilters.gender
            : `${selectedFilters.gender} gender`}{" "}
          {!selectedFilters.status &&
            !selectedFilters.gender &&
            !selectedFilters.species &&
            "all "}
          characters
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid container alignItems="center" justifyContent="center">
        <Mui.FormControl className={classes.formControl}>
          <Mui.InputLabel id="species">Filter by species</Mui.InputLabel>
          <Mui.Select
            labelId="species"
            name="species"
            value={selectedFilters.species}
            onChange={handleFilterSelection}
          >
            <Mui.MenuItem value="">(no filter)</Mui.MenuItem>
            {filters.characters.species.map((el) => (
              <Mui.MenuItem key={el} value={el}>
                {el}
              </Mui.MenuItem>
            ))}
          </Mui.Select>
        </Mui.FormControl>

        <Mui.FormControl className={classes.formControl}>
          <Mui.InputLabel id="status">Filter by status</Mui.InputLabel>
          <Mui.Select
            labelId="status"
            name="status"
            value={selectedFilters.status}
            onChange={handleFilterSelection}
          >
            <Mui.MenuItem value="">(no filter)</Mui.MenuItem>
            {filters.characters.status.map((el) => (
              <Mui.MenuItem key={el} value={el}>
                {el}
              </Mui.MenuItem>
            ))}
          </Mui.Select>
        </Mui.FormControl>

        <Mui.FormControl className={classes.formControl}>
          <Mui.InputLabel id="gender">Filter by gender</Mui.InputLabel>
          <Mui.Select
            labelId="gender"
            name="gender"
            value={selectedFilters.gender}
            onChange={handleFilterSelection}
          >
            <Mui.MenuItem value="">(no filter)</Mui.MenuItem>
            {filters.characters.gender.map((el) => (
              <Mui.MenuItem key={el} value={el}>
                {el}
              </Mui.MenuItem>
            ))}
          </Mui.Select>
        </Mui.FormControl>
      </Mui.Grid>
      <Mui.Grid container style={{ alignItems: "stretch" }} direction="row">
        <CardContainer array={apiData} />
      </Mui.Grid>
      <Mui.Grid container justifyContent="center" alignItems="center">
        <PaginationButtons page={page} handleSelect={handlePagination} />
      </Mui.Grid>
    </Mui.Grid>
  );
}

export default Characters;

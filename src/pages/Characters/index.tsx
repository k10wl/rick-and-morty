/* eslint-disable @typescript-eslint/no-unused-vars,no-unused-vars */
import * as React from "react";
import * as Mui from "@material-ui/core";
import { useSelector } from "react-redux";
import CardContainer from "./CardContainer";
import { DefaultRootState } from "../../redux";
import { Character, PageType } from "../../types";
import FetchData from "../../customHooks/FetchData";
import List from "./List";
import GetAllNames from "../../customHooks/GetAllNames";
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
  const [apiData, setApiData] = React.useState<Character[]>([]);
  const [page, setPage] = React.useState<PageType>([null, null]);
  const [dataReady, setDataReady] = React.useState<boolean>(false);
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
      setDataReady(true);
      setPage([prev, next]);
    }
    if (!loaded) {
      setDataReady(false);
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
    console.log(e);
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

  const { loaded: namesLoaded, namesList } = GetAllNames(defaultUrl);
  return (
    <Mui.Grid style={{ backgroundColor: "white" }}>
      <Mui.Grid container justifyContent="center">
        <Mui.Typography>Characters</Mui.Typography>
      </Mui.Grid>
      <Mui.Grid>
        <Mui.Typography>Filter by</Mui.Typography>
        <Mui.FormControl className={classes.formControl}>
          <Mui.InputLabel id="species">Species</Mui.InputLabel>
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
          <Mui.InputLabel id="status">Status</Mui.InputLabel>
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
          <Mui.InputLabel id="gender">Gender</Mui.InputLabel>
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
        {/* {namesLoaded && <List array={namesList} />} */}
        {dataReady ? <CardContainer array={apiData} /> : <p>loading</p>}
      </Mui.Grid>
      <Mui.Grid container justifyContent="center" alignItems="center">
        <PaginationButtons page={page} handleSelect={handlePagination} />
      </Mui.Grid>
    </Mui.Grid>
  );
}

export default Characters;

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

type CharFilter = {
  species: string;
  status: string;
  gender: string;
};

function Characters() {
  const defaultUrl = "https://rickandmortyapi.com/api/character";
  const [apiUrl, setApiUrl] = React.useState<string>(defaultUrl);
  const [apiData, setApiData] = React.useState<Character[]>([]);
  const [page, setPage] = React.useState<PageType>([null, null]);
  const [dataReady, setDataReady] = React.useState<boolean>(false);
  const defaultFiltersState: CharFilter = {
    species: "none",
    status: "none",
    gender: "none",
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
  function handleFilterSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedFilters({ ...selectedFilters, [e.target.id]: e.target.value });
  }
  React.useEffect(() => {
    const { species, status, gender } = selectedFilters;
    const speciesQuery = species !== "none" && `species=${species}`;
    const statusQuery = status !== "none" && `status=${status}`;
    const genderQuery = gender !== "none" && `gender=${gender}`;
    const query = [speciesQuery, statusQuery, genderQuery]
      .filter(Boolean)
      .join("&");
    setApiUrl(`${defaultUrl}?${query}`);
  }, [selectedFilters]);

  const { loaded: namesLoaded, namesList } = GetAllNames(defaultUrl);
  return (
    <>
      <Mui.Grid container justifyContent="center">
        <Mui.Typography>Characters</Mui.Typography>
      </Mui.Grid>
      <Mui.Grid>
        <Mui.Typography>Filter by</Mui.Typography>
        <label htmlFor="species">
          Species:
          <select
            onChange={handleFilterSelection}
            id="species"
            value={selectedFilters.species}
          >
            <option value="none">none</option>
            {filters.characters.species.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="status">
          Status:
          <select
            onChange={handleFilterSelection}
            id="status"
            value={selectedFilters.status}
          >
            <option value="none">none</option>
            {filters.characters.status.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="gender">
          Gender:
          <select
            onChange={handleFilterSelection}
            id="gender"
            value={selectedFilters.gender}
          >
            <option value="none">none</option>
            {filters.characters.gender.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </label>
      </Mui.Grid>
      <Mui.Grid container style={{ alignItems: "stretch" }} direction="row">
        {namesLoaded && <List array={namesList} />}
        {dataReady ? <CardContainer array={apiData} /> : <p>loading</p>}
      </Mui.Grid>
      <Mui.Grid container justifyContent="center" alignItems="center">
        <PaginationButtons page={page} handleSelect={handlePagination} />
      </Mui.Grid>
    </>
  );
}

export default Characters;

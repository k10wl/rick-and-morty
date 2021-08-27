import * as React from "react";
import * as Mui from "@material-ui/core";
import { useSelector } from "react-redux";
import LocationsTable from "./LocationsTable";
import FetchData from "../../customHooks/FetchData";
import { Location, PageType } from "../../types";
import { DefaultRootState } from "../../redux";
import useStyles from "../../UI/useStyles";

function Locations() {
  const defaultUrl = "https://rickandmortyapi.com/api/location";
  const [apiUrl, setApiUrl] = React.useState(defaultUrl);
  const [apiData, setApiData] = React.useState<Location[]>([]);
  const [page, setPage] = React.useState<PageType>([null, null]);
  const [inputFilter, setInputFilter] = React.useState<string>("");
  const defaultFiltersState = {
    type: "none",
    dimension: "none",
  };
  const [selectedFilters, setSelectedFilters] =
    React.useState<{ type: string; dimension: string }>(defaultFiltersState);

  const { filters } = useSelector((state: DefaultRootState) => state);

  const { loaded, data, prev, next } = FetchData(apiUrl);
  React.useEffect(() => {
    if (loaded) {
      setApiData(data as Location[]);
      setPage([prev, next]);
    }
  }, [loaded]);
  function handlePagination(url: string | null) {
    if (typeof url === "string") {
      setApiUrl(url);
    }
  }
  function handleFilterInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputFilter(e.target.value);
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
    const { type, dimension } = selectedFilters;
    const typeQuery = type !== "none" && `type=${type}`;
    const dimensionQuery = dimension !== "none" && `dimension=${dimension}`;
    const textQuery =
      inputFilter.replace(/ /g, "") !== "" ? `name=${inputFilter}` : "";
    const query = [textQuery, typeQuery, dimensionQuery]
      .filter(Boolean)
      .join("&");
    setApiUrl(`${defaultUrl}?${query}`);
  }, [selectedFilters, inputFilter]);
  const classes = useStyles();

  return (
    <div>
      <h1>Locations</h1>
      <Mui.TextField
        value={inputFilter}
        onChange={handleFilterInput}
        label="Filer by name"
      />

      <Mui.FormControl className={classes.formControl}>
        <Mui.InputLabel id="type">Type</Mui.InputLabel>
        <Mui.Select
          labelId="type"
          name="type"
          value={selectedFilters.type}
          onChange={handleFilterSelection}
        >
          <Mui.MenuItem value="">(no filters)</Mui.MenuItem>
          {filters.locations.type.map((el) => (
            <Mui.MenuItem value={el} key={el}>
              {el}
            </Mui.MenuItem>
          ))}
        </Mui.Select>
      </Mui.FormControl>

      <Mui.FormControl className={classes.formControl}>
        <Mui.InputLabel id="dimension">Dimension</Mui.InputLabel>
        <Mui.Select
          labelId="dimension"
          name="dimension"
          value={selectedFilters.dimension}
          onChange={handleFilterSelection}
        >
          <Mui.MenuItem value="">(no filters)</Mui.MenuItem>
          {filters.locations.dimension.map((el) => (
            <Mui.MenuItem value={el} key={el}>
              {el}
            </Mui.MenuItem>
          ))}
        </Mui.Select>
      </Mui.FormControl>

      <LocationsTable
        array={apiData}
        page={page}
        handleSelect={handlePagination}
      />
    </div>
  );
}

export default Locations;

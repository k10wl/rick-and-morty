import * as React from "react";
import * as Mui from "@material-ui/core";
import { useSelector } from "react-redux";
import LocationsTable from "./LocationsTable";
import FetchData from "../../customHooks/FetchData";
import { Location, PageType } from "../../types";
import { DefaultRootState } from "../../redux";

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

  function handleFilterSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedFilters({ ...selectedFilters, [e.target.id]: e.target.value });
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

  return (
    <div>
      <h1>Locations</h1>
      <Mui.TextField
        value={inputFilter}
        onChange={handleFilterInput}
        label="Filer by name"
      />
      <select id="type" defaultValue="none" onChange={handleFilterSelection}>
        <option value="none">None</option>
        {filters.locations.type.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
      <select
        id="dimension"
        defaultValue="none"
        onChange={handleFilterSelection}
      >
        <option value="none">None</option>
        {filters.locations.dimension.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
      <LocationsTable
        array={apiData}
        page={page}
        handleSelect={handlePagination}
      />
    </div>
  );
}

export default Locations;

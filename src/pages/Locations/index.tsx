import * as React from "react";
import * as Mui from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { FilterList } from "@material-ui/icons";
import LocationsTable from "./LocationsTable";
import FetchData from "../../customHooks/FetchData";
import { Location, PageType } from "../../types";
import useStyles from "../../UI/useStyles";
import FiltersPopover from "./FiltersPopover";

function Locations() {
  const defaultUrl = "https://rickandmortyapi.com/api/location";
  const [apiUrl, setApiUrl] = React.useState(defaultUrl);
  const [apiData, setApiData] = React.useState<Location[]>([]);
  const [page, setPage] = React.useState<PageType>([null, null]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [inputFilter, setInputFilter] = React.useState<string>("");
  const [forceUpdate, setForceUpdate] = React.useState<boolean>(false);
  const defaultFiltersState = {
    type: "",
    dimension: "",
  };
  const [selectedFilters, setSelectedFilters] =
    React.useState<{ type: string; dimension: string }>(defaultFiltersState);

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
  function handleSubmit(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    if (typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    setForceUpdate(!forceUpdate);
  }
  React.useEffect(() => {
    const { type, dimension } = selectedFilters;
    const typeQuery = type !== "" && `type=${type}`;
    const dimensionQuery = dimension !== "" && `dimension=${dimension}`;
    const textQuery =
      inputFilter.replace(/ /g, "") !== "" ? `name=${inputFilter}` : "";
    const query = [textQuery, typeQuery, dimensionQuery]
      .filter(Boolean)
      .join("&");
    setApiUrl(`${defaultUrl}?${query}`);
  }, [forceUpdate, selectedFilters]);
  const classes = useStyles();

  function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl);
  return (
    <Mui.Grid className={classes.tabRoot}>
      <Mui.Typography variant="h4" align="center">
        Table of locations
      </Mui.Typography>
      <form onSubmit={handleSubmit}>
        <Mui.Grid container justifyContent="center" alignItems="center">
          <Mui.TextField
            value={inputFilter}
            onChange={handleFilterInput}
            label="Filer by name"
            fullWidth
            InputProps={{
              endAdornment: (
                <>
                  <Mui.IconButton onClick={handleOpen}>
                    <FilterList />
                  </Mui.IconButton>
                  <Mui.IconButton onClick={handleSubmit}>
                    <SearchIcon />
                  </Mui.IconButton>
                </>
              ),
            }}
          />
        </Mui.Grid>
      </form>

      <LocationsTable
        array={apiData}
        page={page}
        handleSelect={handlePagination}
      />
      <FiltersPopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        selectedFilters={selectedFilters}
        handleFilterSelection={handleFilterSelection}
      />
    </Mui.Grid>
  );
}

export default Locations;

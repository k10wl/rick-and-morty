import * as React from "react";
import * as Mui from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
import EpisodesTable from "./EpisodesTable";
import { Episode, PageType } from "../../types";
import FetchData from "../../customHooks/FetchData";
import useStyles from "../../UI/useStyles";
import { DefaultRootState } from "../../redux";

function Episodes() {
  const { pages } = useSelector((state: DefaultRootState) => state);
  const [apiData, setApiData] = React.useState<Episode[]>(pages.episodes);
  const defaultUrl = "https://rickandmortyapi.com/api/episode";
  const [apiUrl, setApiUrl] = React.useState<string>(defaultUrl);
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState<PageType>([null, null]);
  const [forceUpdate, setForceUpdate] = React.useState<boolean>(false);
  const { loaded, data, prev, next } = FetchData(apiUrl);
  React.useEffect(() => {
    if (loaded) {
      setPage([prev, next]);
      setApiData(data as Episode[]);
    }
  }, [loaded]);
  function handlePagination(url: string | null) {
    if (typeof url === "string") {
      setApiUrl(url);
    }
  }
  function handleFilterInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFilter(e.target.value);
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
    const query = filter.replace(/ /g, "") !== "" ? `?name=${filter}` : "";
    setApiUrl(defaultUrl + query);
  }, [forceUpdate]);
  const classes = useStyles();
  return (
    <Mui.Grid className={classes.tabRoot}>
      <Mui.Typography variant="h4" align="center">
        List of episodes
      </Mui.Typography>
      <form onSubmit={handleSubmit}>
        <Mui.Grid container justifyContent="center" alignItems="center">
          <Mui.TextField
            className={classes.textFieldSpacing}
            label="Enter filter"
            value={filter}
            onChange={handleFilterInput}
            fullWidth
            InputProps={{
              endAdornment: (
                <Mui.Grid>
                  <Mui.IconButton onClick={handleSubmit} color="primary">
                    <SearchIcon />
                  </Mui.IconButton>
                </Mui.Grid>
              ),
            }}
          />
        </Mui.Grid>
      </form>
      <EpisodesTable
        array={apiData}
        page={page}
        handleSelect={handlePagination}
      />
    </Mui.Grid>
  );
}

export default Episodes;

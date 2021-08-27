import * as React from "react";
import * as Mui from "@material-ui/core";
import EpisodesTable from "./EpisodesTable";
import { Episode } from "../../types";
import FetchData from "../../customHooks/FetchData";

function Episodes() {
  const [apiData, setApiData] = React.useState<Episode[]>([]);
  const defaultUrl = "https://rickandmortyapi.com/api/episode";
  const [apiUrl, setApiUrl] = React.useState<string>(defaultUrl);
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState<[string | null, string | null]>([
    null,
    null,
  ]);
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
  React.useEffect(() => {
    const query = filter.replace(/ /g, "") !== "" ? `?name=${filter}` : "";
    setApiUrl(defaultUrl + query);
  }, [filter]);
  return (
    <div>
      <h1>Episodes</h1>
      <Mui.TextField
        variant="outlined"
        label="Filter"
        value={filter}
        onChange={handleFilterInput}
      />
      <EpisodesTable
        array={apiData}
        page={page}
        handleSelect={handlePagination}
      />
    </div>
  );
}

export default Episodes;

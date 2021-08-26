import * as React from "react";
import { useDispatch } from "react-redux";
import { addFilter } from "../redux/filters";
import { storePages } from "../redux/pages";

function StoreDataInRedux() {
  const [charLoad, setCharLoad] = React.useState(false);
  const [locLoad, setLocLoad] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const speciesSet = new Set();
    const statusSet = new Set();
    const genderSet = new Set();
    const typeSet = new Set();
    const dimensionSet = new Set();
    function fetchFilters(url: string, filter: "characters" | "locations") {
      fetch(url)
        .then((r) => r.json())
        .then((r) => {
          dispatch(storePages({ category: filter, pageData: r.results }));
          if (filter === "characters") {
            r.results.forEach(
              ({ gender, species, status }: { [k: string]: string }) => {
                speciesSet.add(species);
                statusSet.add(status);
                genderSet.add(gender);
              }
            );
          }
          if (filter === "locations") {
            r.results.forEach(
              ({ type, dimension }: { [k: string]: string }) => {
                typeSet.add(type);
                dimensionSet.add(dimension);
              }
            );
          }
          if (r.info.next) {
            fetchFilters(r.info.next, filter);
          } else {
            const charactersFilter = {
              species: [...speciesSet],
              status: [...statusSet],
              gender: [...genderSet],
            };
            const locationsFilter = {
              type: [...typeSet],
              dimension: [...dimensionSet],
            };
            const result = {
              filter,
              data:
                filter === "characters" ? charactersFilter : locationsFilter,
            };
            dispatch(addFilter(result));
            if (filter === "characters") {
              setCharLoad(true);
            } else {
              setLocLoad(true);
            }
          }
        });
    }
    fetchFilters(
      "https://rickandmortyapi.com/api/character?page=1",
      "characters"
    );
    fetchFilters(
      "https://rickandmortyapi.com/api/location?page=1",
      "locations"
    );
  }, []);
  return [charLoad, locLoad];
}

export default StoreDataInRedux;

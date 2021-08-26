import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFilter } from "../redux/filters";

function StoreFiltersInRedux() {
  const dispatch = useDispatch();
  useEffect(() => {
    const speciesSet = new Set();
    const statusSet = new Set();
    const genderSet = new Set();
    const typeSet = new Set();
    const dimensionSet = new Set();
    function fetchFilters(url: string, filter: "characters" | "locations") {
      fetch(url)
        .then((r) => r.json())
        .then((r) => {
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
          }
        });
    }
    fetchFilters("https://rickandmortyapi.com/api/character", "characters");
    fetchFilters("https://rickandmortyapi.com/api/location", "locations");
  }, []);
}

export default StoreFiltersInRedux;

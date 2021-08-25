/* eslint-disable no-unused-vars */
import * as React from "react";
import { useEffect, useState, useCallback } from "react";

type Props = {};

function Characters(props: Props) {
  const emptySet = new Set();
  const [speciesSet, setSpeciesSet] = useState(emptySet);
  const fetchCallback = useCallback((url, number = 1) => {
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        r.results.forEach((el: { type: String }) =>
          setSpeciesSet(speciesSet.add(el.type))
        );
        if (r.info.next) {
          fetchCallback(r.info.next, number + 1);
        } else {
          // @ts-ignore
          console.log([...speciesSet], number);
        }
      });
  }, []);
  useEffect(() => {
    setSpeciesSet(emptySet);
    fetchCallback("https://rickandmortyapi.com/api/location");
  }, []);
  console.log(props);
  return (
    <div>
      <h1>Characters</h1>
      <button type="button" onClick={() => console.log(speciesSet)}>
        Log species
      </button>
    </div>
  );
}

export default Characters;

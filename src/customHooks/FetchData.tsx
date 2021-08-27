import * as React from "react";
import { Location, Episode, InfoType } from "../types";

function FetchData(url: string) {
  const [data, setData] = React.useState<Episode[] | Location[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [prev, setPrev] = React.useState<string | null>(null);
  const [next, setNext] = React.useState<string | null>(null);
  React.useEffect(() => {
    setLoaded(false);
    fetch(url)
      .then((r) => r.json())
      .then(
        ({
          info,
          results,
        }: {
          info: InfoType;
          results: Episode[] | Location[];
        }) => {
          setPrev(info !== undefined ? info.prev : null);
          setNext(info !== undefined ? info.next : null);
          setData(results !== undefined ? results : []);
        }
      )
      .then(() => setLoaded(true));
  }, [url]);
  return { loaded, data, prev, next };
}

export default FetchData;

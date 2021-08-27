import * as React from "react";
import { Episode, InfoType } from "../types";

function FetchEpisodes(url: string) {
  const [episodes, setEpisodes] = React.useState<Episode[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [prev, setPrev] = React.useState<string | null>(null);
  const [next, setNext] = React.useState<string | null>(null);
  React.useEffect(() => {
    setLoaded(false);
    fetch(url)
      .then((r) => r.json())
      .then(({ info, results }: { info: InfoType; results: Episode[] }) => {
        setPrev(info !== undefined ? info.prev : null);
        setNext(info !== undefined ? info.next : null);
        setEpisodes(results !== undefined ? results : []);
      })
      .then(() => setLoaded(true));
  }, [url]);
  return { loaded, episodes, prev, next };
}

export default FetchEpisodes;

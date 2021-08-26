import * as React from "react";
import { Character, InfoType } from "../types";

type Props = string;

function GetAllNames(url: Props) {
  const [loaded, setLoaded] = React.useState(false);
  const [namesList, setNamesList] = React.useState<string[]>([]);
  React.useEffect(() => {
    setLoaded(false);
    const namesSet: Set<string> = new Set();
    function fetchCallback(apiUrl: string) {
      const [, request] = apiUrl.split("?");
      if (apiUrl === "" || request === "") {
        return;
      }
      fetch(apiUrl)
        .then((r) => r.json())
        .then(({ info, results }: { info: InfoType; results: Character[] }) => {
          results.forEach((el) => namesSet.add(el.name));
          if (info.next) {
            fetchCallback(info.next);
          }
          if (!info.next) {
            setLoaded(true);
            setNamesList([...namesSet]);
          }
        });
    }
    fetchCallback(url);
  }, [url]);
  return { loaded, namesList };
}

export default GetAllNames;

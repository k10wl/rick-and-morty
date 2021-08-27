import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character, InfoType } from "../types";
import { DefaultRootState } from "../redux";
import { setNames } from "../redux/names";

type Props = string;

function GetAllNames(url: Props) {
  const [loaded, setLoaded] = React.useState(false);
  const [namesList, setNamesList] = React.useState<string[]>([]);
  const { names } = useSelector((state: DefaultRootState) => state);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setLoaded(false);
    const namesSet: string[] = [];
    function fetchCallback(apiUrl: string) {
      const [, request] = apiUrl.split("?");
      if (names.length !== 0 && (apiUrl === "" || request === "")) {
        setNamesList(names);
        setLoaded(true);
        return;
      }
      fetch(apiUrl)
        .then((r) => r.json())
        .then(({ info, results }: { info: InfoType; results: Character[] }) => {
          if (!info) {
            setNamesList([]);
            setLoaded(true);
            return;
          }
          results.forEach((el) => namesSet.push(el.name));
          if (info.next) {
            fetchCallback(info.next);
          }
          if (!info.next) {
            setNamesList(namesSet);
            setLoaded(true);
            if (names.length === 0) {
              dispatch(setNames(namesSet));
            }
          }
        });
    }
    fetchCallback(url);
  }, []);
  return { loaded, namesList };
}

export default GetAllNames;

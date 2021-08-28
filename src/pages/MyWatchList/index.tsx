import * as React from "react";
import * as Mui from "@material-ui/core";
import { useMemo } from "react";
import ToWatchTable from "./ToWatchTable";

type CommentSubmitType =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.MouseEvent<HTMLButtonElement>;
type InputType = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export type ToWatchType = {
  id: number;
  text: string;
  completed: boolean;
};

function MyWatchList() {
  const [input, setInput] = React.useState<string>("");
  const [toWatch, setToWatch] = React.useState<ToWatchType[]>([]);
  React.useEffect(() => {
    if (localStorage.getItem("comments")) {
      setToWatch(JSON.parse(localStorage.getItem("comments") as string));
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(toWatch));
  }, [toWatch]);
  function handleInput(e: InputType) {
    setInput(e.currentTarget.value);
  }
  function handleSubmit(e: CommentSubmitType) {
    e.preventDefault();
    const empty = input.replace(/ /g, "");
    if (!empty) {
      return;
    }
    const newId = toWatch.length !== 0 ? toWatch[toWatch.length - 1].id + 1 : 1;
    const comment = {
      text: input,
      completed: false,
      id: newId,
    };
    const value = toWatch.length !== 0 ? [...toWatch, comment] : [comment];
    setToWatch(value);
    setInput("");
  }
  function handleToggle(id: number) {
    const toggled = toWatch.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          completed: !el.completed,
        };
      }
      return el;
    });
    setToWatch(toggled);
  }
  function handleRemove(id: number) {
    const removed = toWatch.filter((el) => el.id !== id);
    setToWatch(removed);
  }

  const toWatchTableMemo = useMemo(
    () => (
      <ToWatchTable
        toWatch={toWatch}
        handleToggle={handleToggle}
        handleRemove={handleRemove}
      />
    ),
    [toWatch]
  );

  return (
    <Mui.Grid>
      <Mui.Typography align="center" variant="h1">
        Your toWatch list
      </Mui.Typography>
      <form onSubmit={handleSubmit}>
        <Mui.Grid item container justifyContent="center">
          <Mui.Box width="75%">
            <Mui.TextField
              label="Add here episode that you want toWatch later"
              value={input}
              onChange={handleInput}
              fullWidth
              InputProps={{
                endAdornment: (
                  <Mui.Grid>
                    <Mui.Button onClick={handleSubmit} variant="outlined">
                      Add
                    </Mui.Button>
                  </Mui.Grid>
                ),
              }}
            />
          </Mui.Box>
        </Mui.Grid>
      </form>
      <Mui.Grid container justifyContent="center">
        <Mui.Box width="75%">{toWatchTableMemo}</Mui.Box>
      </Mui.Grid>
    </Mui.Grid>
  );
}

export default MyWatchList;

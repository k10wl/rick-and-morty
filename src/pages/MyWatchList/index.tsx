import * as React from "react";
import * as Mui from "@material-ui/core";
import ToWatch from "./ToWatch";

type CommentSubmitType =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.MouseEvent<HTMLButtonElement>;
type InputType = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

type ToWatchType = {
  id: number;
  text: string;
  completed: boolean;
};

function MyWatchList() {
  const [input, setInput] = React.useState("");
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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Mui.TextField label="To watch" value={input} onChange={handleInput} />
        <Mui.Button onClick={handleSubmit}>Add ToWatch</Mui.Button>
      </form>
      <h1>MyWatchList</h1>
      {toWatch.map((el: ToWatchType) => (
        <ToWatch
          key={el.id}
          text={el.text}
          completed={el.completed}
          id={el.id}
          handleToggle={handleToggle}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
}

export default MyWatchList;

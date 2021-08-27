import * as React from "react";
import { Button, Typography } from "@material-ui/core";

type Props = {
  id: number;
  text: string;
  completed: boolean;
  handleToggle: (id: number) => void;
  handleRemove: (id: number) => void;
};

function ToWatch({ id, text, completed, handleToggle, handleRemove }: Props) {
  return (
    <div className={completed ? "completed" : undefined}>
      <Typography>{text}</Typography>
      {completed && <p>completed</p>}
      <Button onClick={() => handleToggle(id)}>Toggle</Button>
      <Button onClick={() => handleRemove(id)}>Remove</Button>
    </div>
  );
}

export default ToWatch;

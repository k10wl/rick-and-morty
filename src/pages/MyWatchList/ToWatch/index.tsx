import * as React from "react";
import { Button, Typography } from "@material-ui/core";

type Props = {
  text: string;
  completed: boolean;
};

function ToWatch({ text, completed }: Props) {
  return (
    <div className={completed ? "comleted" : undefined}>
      <Typography>{text}</Typography>
      <Button>Toggle</Button>
    </div>
  );
}

export default ToWatch;

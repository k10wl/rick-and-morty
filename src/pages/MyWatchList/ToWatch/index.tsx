import * as React from "react";
import * as Mui from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import useStyles from "../../../UI/useStyles";

type Props = {
  id: number;
  text: string;
  completed: boolean;
  handleToggle: (id: number) => void;
  handleRemove: (id: number) => void;
};

function ToWatch({ id, text, completed, handleToggle, handleRemove }: Props) {
  const classes = useStyles();
  return (
    <Mui.TableRow>
      <Mui.TableCell key={id}>
        <Mui.Grid container justifyContent="space-between">
          <Mui.Typography
            className={`${classes.task} ${
              completed ? classes.taskCompleted : classes.taskPending
            }`}
          >
            {text}
          </Mui.Typography>
          <Mui.Grid>
            <Mui.Tooltip title="Toggle completed">
              <Mui.IconButton onClick={() => handleToggle(id)}>
                <CheckIcon />
              </Mui.IconButton>
            </Mui.Tooltip>
            <Mui.Tooltip title="Remove task">
              <Mui.IconButton onClick={() => handleRemove(id)}>
                <ClearIcon />
              </Mui.IconButton>
            </Mui.Tooltip>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.TableCell>
    </Mui.TableRow>

    // <div className={completed ? "completed" : undefined}>
    //   <Typography>{text}</Typography>
    //   {completed && <p>completed</p>}
    //   <Button onClick={() => handleToggle(id)}>Toggle</Button>
    //   <Button onClick={() => handleRemove(id)}>Remove</Button>
    // </div>
  );
}

export default ToWatch;

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
        <Mui.Grid container justifyContent="space-between" alignItems="center">
          <Mui.Grid item xs>
            <Mui.Typography
              className={`${classes.task} ${
                completed ? classes.taskCompleted : classes.taskPending
              }`}
            >
              {text}
            </Mui.Typography>
          </Mui.Grid>
          <div>
            <Mui.Tooltip title="Toggle completed">
              <Mui.IconButton onClick={() => handleToggle(id)} color="primary">
                <CheckIcon />
              </Mui.IconButton>
            </Mui.Tooltip>
            <Mui.Tooltip title="Remove task">
              <Mui.IconButton onClick={() => handleRemove(id)} color="primary">
                <ClearIcon />
              </Mui.IconButton>
            </Mui.Tooltip>
          </div>
        </Mui.Grid>
      </Mui.TableCell>
    </Mui.TableRow>
  );
}

export default ToWatch;

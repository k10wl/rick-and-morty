import * as React from "react";
import * as Mui from "@material-ui/core";
import ToWatch from "../ToWatch";
import { ToWatchType } from "../index";

type Props = {
  toWatch: ToWatchType[];
  handleToggle: (id: number) => void;
  handleRemove: (id: number) => void;
};

function ToWatchTable({ toWatch, handleToggle, handleRemove }: Props) {
  return (
    <Mui.Grid container direction="column" alignItems="center">
      <Mui.TableContainer>
        <Mui.Table>
          <Mui.TableBody>
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
          </Mui.TableBody>
        </Mui.Table>
      </Mui.TableContainer>
    </Mui.Grid>
  );
}

export default ToWatchTable;

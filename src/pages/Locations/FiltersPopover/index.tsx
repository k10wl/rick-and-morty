import * as React from "react";
import * as Mui from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "../../../UI/useStyles";
import { DefaultRootState } from "../../../redux";

type Props = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  selectedFilters: { type: string; dimension: string };
  handleFilterSelection: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
};

function FiltersPopover({
  open,
  handleClose,
  anchorEl,
  selectedFilters,
  handleFilterSelection,
}: Props) {
  const { filters } = useSelector((state: DefaultRootState) => state);
  const classes = useStyles();
  return (
    <Mui.Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Mui.Grid container direction="column">
        <Mui.FormControl className={classes.formControl}>
          <Mui.InputLabel id="type">Type</Mui.InputLabel>
          <Mui.Select
            labelId="type"
            name="type"
            value={selectedFilters.type}
            onChange={handleFilterSelection}
          >
            <Mui.MenuItem value="">(no filters)</Mui.MenuItem>
            {filters.locations.type.map((el) => (
              <Mui.MenuItem value={el} key={el}>
                {el}
              </Mui.MenuItem>
            ))}
          </Mui.Select>
        </Mui.FormControl>

        <Mui.FormControl className={classes.formControl}>
          <Mui.InputLabel id="dimension">Dimension</Mui.InputLabel>
          <Mui.Select
            labelId="dimension"
            name="dimension"
            value={selectedFilters.dimension}
            onChange={handleFilterSelection}
          >
            <Mui.MenuItem value="">(no filters)</Mui.MenuItem>
            {filters.locations.dimension.map((el) => (
              <Mui.MenuItem value={el} key={el}>
                {el}
              </Mui.MenuItem>
            ))}
          </Mui.Select>
        </Mui.FormControl>
      </Mui.Grid>
    </Mui.Popover>
  );
}

export default FiltersPopover;

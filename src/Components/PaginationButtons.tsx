import * as React from "react";
import * as Mui from "@material-ui/core";

type Props = {
  page: [string | null, string | null];
  handleSelect: (url: string | null) => void;
};

function PaginationButtons({ page, handleSelect }: Props) {
  return (
    <Mui.Grid>
      <Mui.Button
        variant="contained"
        color="primary"
        disabled={page[0] === null}
        onClick={() => handleSelect(page[0])}
      >
        {`< PREV`}
      </Mui.Button>
      <span>{` `}</span>
      <Mui.Button
        variant="contained"
        color="primary"
        disabled={page[1] === null}
        onClick={() => handleSelect(page[1])}
      >
        {`NEXT >`}
      </Mui.Button>
    </Mui.Grid>
  );
}

export default PaginationButtons;

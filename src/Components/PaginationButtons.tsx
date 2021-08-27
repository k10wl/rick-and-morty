// @flow
import * as React from "react";
import * as Mui from "@material-ui/core";

type Props = {
  page: [string | null, string | null];
  handleSelect: (url: string | null) => void;
};

function PaginationButtons({ page, handleSelect }: Props) {
  return (
    <>
      <Mui.Button
        disabled={page[0] === null}
        onClick={() => handleSelect(page[0])}
      >
        {`<`}
      </Mui.Button>
      <Mui.Button
        disabled={page[1] === null}
        onClick={() => handleSelect(page[1])}
      >
        {`>`}
      </Mui.Button>
    </>
  );
}

export default PaginationButtons;

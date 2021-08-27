import * as React from "react";
import * as Mui from "@material-ui/core";

type Props = {
  page: [string | null, string | null];
  handleSelect: (url: string | null) => void;
};

function TableFooterPagination({ page, handleSelect }: Props) {
  return (
    <Mui.TableFooter>
      <Mui.TableRow>
        <Mui.TableCell />
        <Mui.TableCell />
        <Mui.TableCell align="right">
          <Mui.Button
            disabled={page[0] === null}
            onClick={() => handleSelect(page[0])}
          >
            prev
          </Mui.Button>
          <Mui.Button
            disabled={page[1] === null}
            onClick={() => handleSelect(page[1])}
          >
            next
          </Mui.Button>
        </Mui.TableCell>
      </Mui.TableRow>
    </Mui.TableFooter>
  );
}

export default TableFooterPagination;

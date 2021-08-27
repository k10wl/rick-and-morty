import * as React from "react";
import * as Mui from "@material-ui/core";
import PaginationButtons from "./PaginationButtons";

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
          <PaginationButtons page={page} handleSelect={handleSelect} />
        </Mui.TableCell>
      </Mui.TableRow>
    </Mui.TableFooter>
  );
}

export default TableFooterPagination;

import * as React from "react";
import * as Mui from "@material-ui/core";
import MyTableCell from "../../../UI/MyTableCell";
import { Location } from "../../../types";
import TableFooterPagination from "../../../Components/TableFooterPagination";

type Props = {
  array: Location[];
  page: [string | null, string | null];
  handleSelect: (url: string | null) => void;
};

function LocationsTable({ array, page, handleSelect }: Props) {
  return (
    <Mui.TableContainer>
      <Mui.Table>
        <Mui.TableHead>
          <Mui.TableRow>
            <MyTableCell>Name</MyTableCell>
            <MyTableCell>Type</MyTableCell>
            <MyTableCell>Dimension</MyTableCell>
          </Mui.TableRow>
        </Mui.TableHead>
        <Mui.TableBody>
          {array.map((el) => (
            <Mui.TableRow>
              <Mui.TableCell>{el.name}</Mui.TableCell>
              <Mui.TableCell>{el.type}</Mui.TableCell>
              <Mui.TableCell>{el.dimension}</Mui.TableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
      </Mui.Table>
      <TableFooterPagination page={page} handleSelect={handleSelect} />
    </Mui.TableContainer>
  );
}

export default LocationsTable;

import * as React from "react";
import * as Mui from "@material-ui/core";
import MyTableCell from "../../../UI/MyTableCell";
import { Episode } from "../../../types";
import TableFooterPagination from "../../../Components/TableFooterPagination";

type Props = {
  array: Episode[];
  page: [string | null, string | null];
  handleSelect: (url: string | null) => void;
};

function EpisodesTable({ array, page, handleSelect }: Props) {
  return (
    <Mui.TableContainer component={Mui.Paper}>
      <Mui.Table>
        <Mui.TableHead>
          <Mui.TableRow>
            <MyTableCell>Episode name</MyTableCell>
            <MyTableCell align="right">Episode</MyTableCell>
            <MyTableCell align="right">Air date</MyTableCell>
          </Mui.TableRow>
        </Mui.TableHead>
        <Mui.TableBody>
          {array.map((el) => (
            <Mui.TableRow key={el.id}>
              <Mui.TableCell>{el.name}</Mui.TableCell>
              <Mui.TableCell align="right">{el.episode}</Mui.TableCell>
              <Mui.TableCell align="right">{el.air_date}</Mui.TableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
        <TableFooterPagination page={page} handleSelect={handleSelect} />
      </Mui.Table>
    </Mui.TableContainer>
  );
}

export default EpisodesTable;

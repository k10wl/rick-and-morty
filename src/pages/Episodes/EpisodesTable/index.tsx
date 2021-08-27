import * as React from "react";
import * as Mui from "@material-ui/core";
import { Episode } from "../../../types";

type Props = {
  array: Episode[];
  page: [string | null, string | null];
  handleSelect: (url: string | null) => void;
};

const StyledTableCell = Mui.withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(Mui.TableCell);

function EpisodesTable({ array, page, handleSelect }: Props) {
  return (
    <Mui.TableContainer component={Mui.Paper}>
      <Mui.Table>
        <Mui.TableHead>
          <Mui.TableRow>
            <StyledTableCell>Episode name</StyledTableCell>
            <StyledTableCell align="right">Episode</StyledTableCell>
            <StyledTableCell align="right">Air date</StyledTableCell>
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
      </Mui.Table>
    </Mui.TableContainer>
  );
}

export default EpisodesTable;

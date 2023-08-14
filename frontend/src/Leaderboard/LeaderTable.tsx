import React, { useEffect } from "react";
import { User } from "../User/User.ts";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import LeaderRow from "./LeaderRow.tsx";

// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface LeaderListProps {
  users: User[];
}

interface Column {
  id: "rank" | "nickname" | "wins" | "loses";
  label: string;
  minWidth?: number;
  align?: string;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "rank", label: "Rank", align: "center", minWidth: 50 },
  { id: "nickname", label: "Player", minWidth: 100, align: "center" },
  {
    id: "wins",
    label: "Wins",
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
    minWidth: 75,
  },
  {
    id: "loses",
    label: "Losses",
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
    minWidth: 75,
  },
];

const LeaderTable = ({ users }: LeaderListProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {}, [users]);

  // @ts-ignore
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      sx={{
        minWidth: "70vw",
        paddingTop: "2em",
        opacity: "90%",
        paddingBottom: "3rem",
      }}
    >
      <Paper sx={{ width: "61%", border: 3 }}>
        <TableContainer sx={{ maxHeight: "68vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  key="blankSpace"
                  style={{ top: 0 }}
                ></TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{
                      top: 0,
                      fontFamily: "AtariFont",
                    }}
                  >
                    <h2 style={{ fontSize: "2vw" }}>{column.label}</h2>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) => user.wins + user.loses != 0)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <LeaderRow user={user} key={user.id} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default LeaderTable;

import React from "react";
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
    label: "Loses",
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
    minWidth: 75,
  },
];
//
// interface Data {
//   rank: number;
//   name: string;
//   wins: number;
//   loses: number;
// }

const LeaderTable = ({ users }: LeaderListProps) => {
  // const items: any = users.map((user, index: number) => {
  //   return <LeaderRow user={user} rank={index + 1} key={user.id} />;
  // });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ minWidth: "70vw", paddingTop: "20px" }}
    >
      <Paper sx={{ width: "50%" }}>
        <TableContainer sx={{ maxHeight: 720 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  <h1>Leaderboard</h1>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  key="blankSpace"
                  style={{ top: 57, width: "10px" }}
                ></TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ top: 57, width: column.minWidth }}
                  >
                    <h3>{column.label}</h3>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
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

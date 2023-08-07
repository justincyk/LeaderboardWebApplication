import React, { useState } from "react";
// import ImageIcon from "@mui/icons-material/Image";
import { User } from "../User/User.ts";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";

interface Column {
  id: "rank" | "nickname" | "wins" | "loses";
  label: string;
  minWidth?: number;
  align?: string | "center";
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

interface LeaderPlayerProp {
  user: User;
}

const LeaderRow = ({ user }: LeaderPlayerProp) => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell sx={{ width: "20px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {columns.map((column) => {
          const value = user[column.id];
          console.log(value);
          return (
            <TableCell key={column.id} align="center">
              {column.format && typeof value === "number"
                ? column.format(value)
                : value}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Most Recent Match History
              </Typography>
              <Table size="small" aria-label="matchHistory">
                <TableHead>
                  <TableRow>
                    <TableCell align={"center"}>Date</TableCell>
                    <TableCell align={"center"}>Winner</TableCell>
                    <TableCell align="center">Loser</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.history.map((historyRow) => (
                    <TableRow key={historyRow.matchId}>
                      <TableCell align={"center"}>
                        {historyRow.matchDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">{historyRow.winner}</TableCell>
                      <TableCell align="center">{historyRow.loser}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default LeaderRow;

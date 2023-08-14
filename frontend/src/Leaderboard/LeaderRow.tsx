import React, { useEffect, useState } from "react";
// import ImageIcon from "@mui/icons-material/Image";
import { User } from "../User/User.ts";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
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
  handleUserBioOpen: () => void;
}

const LeaderRow = ({ user, handleUserBioOpen }: LeaderPlayerProp) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [user]);

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{ width: "1vw" }}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon sx={{ width: "2vw" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ width: "2vw" }} />
            )}
          </IconButton>
        </TableCell>

        {columns.map((column) => {
          const value = user[column.id];
          return (
            <TableCell
              key={column.id}
              align="center"
              sx={{
                fontFamily: "AtariFontExtraSmooth",
                fontSize: "1.3vw",
                cursor: "pointer",
              }}
              onClick={() => handleUserBioOpen()}
            >
              {column.format && typeof value === "number"
                ? column.format(value)
                : value}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div
                style={{
                  fontFamily: "AtariFontSmooth",
                  fontSize: "1.2vw",
                  // textDecoration: "underline",
                }}
              >
                Most Recent Match History
              </div>
              <Table size="small" aria-label="matchHistory">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align={"center"}
                      sx={{ fontFamily: "AtariFontSmooth", fontSize: "1vw" }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      align={"center"}
                      sx={{ fontFamily: "AtariFontSmooth", fontSize: "1vw" }}
                    >
                      Winner
                    </TableCell>
                    <TableCell
                      align={"center"}
                      sx={{ fontFamily: "AtariFontSmooth", fontSize: "1vw" }}
                    >
                      Loser
                    </TableCell>
                    <TableCell
                      align={"center"}
                      sx={{ fontFamily: "AtariFontSmooth", fontSize: "1vw" }}
                    >
                      Player Elo Change
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.history.slice(0, 3).map((historyRow) => (
                    <TableRow key={historyRow.matchId}>
                      <TableCell
                        align={"center"}
                        sx={{
                          fontFamily: "AtariFontExtraSmooth",
                          fontSize: "0.8vw",
                        }}
                      >
                        {historyRow.matchDate}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "AtariFontExtraSmooth",
                          fontSize: "0.8vw",
                        }}
                      >
                        {historyRow.winner}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "AtariFontExtraSmooth",
                          fontSize: "0.8vw",
                        }}
                      >
                        {historyRow.loser}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "AtariFontExtraSmooth",
                          fontSize: "0.8vw",
                        }}
                      >
                        {user["nickname"] === historyRow.winner
                          ? historyRow.winnerEloChange.toFixed(3)
                          : historyRow.loserEloChange.toFixed(3)}
                      </TableCell>
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

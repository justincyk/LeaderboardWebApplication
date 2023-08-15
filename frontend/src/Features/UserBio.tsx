// @ts-ignore
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { User } from "../User/User.ts";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";

interface Data {
  matchDate: string;
  winner: string;
  loser: string;
  winnerEloChange: number;
  loserEloChange: number;
  matchId: number;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 50,
    label: "Date",
    dataKey: "matchDate",
  },
  {
    width: 50,
    label: "Winner",
    dataKey: "winner",
  },
  {
    width: 50,
    label: "Loser",
    dataKey: "loser",
    numeric: true,
  },
  {
    width: 50,
    label: "Winner Elo Change",
    dataKey: "winnerEloChange",
    numeric: true,
  },
  {
    width: 50,
    label: "Loser Elo Change",
    dataKey: "loserEloChange",
    numeric: true,
  },
];

interface UserBioProps {
  openUserBio: boolean;
  handleUserBioClose: () => void;
  selectedPlayer: User | undefined;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundImage: `url("../images/userBioBackground2.gif")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "blue",
  fontFamily: "AtariFont",
  width: "54vw",
  height: "auto",
  padding: "20px",
};

const UserBio = ({
  openUserBio,
  handleUserBioClose,
  selectedPlayer,
}: UserBioProps) => {
  useEffect(() => {
    setRows(selectedPlayer?.history || []);
  }, [selectedPlayer]);
  const [rows, setRows] = useState<Data[]>(selectedPlayer?.history || []);

  const VirtuosoTableComponents: TableComponents<Data> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{
          borderCollapse: "separate",
          tableLayout: "fixed",
          // opacity: "50%",
          height: "100%",
          backgroundImage: `url("../images/userBioBackground.gif")`,
        }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={"center"}
            style={{ width: "1vw" }}
            sx={{
              backgroundColor: "grey",
              fontFamily: "AtariFontSmooth",
              fontSize: "0.7vw",
              color: "yellow",
              padding: "5px",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: Data) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={"center"}
            style={{
              fontFamily: "AtariFontExtraSmooth",
              fontSize: "0.6vw",
              background: "rgba(204, 204, 204, 0.5)",
              opacity: "80%",
              color: "yellow",
            }}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Modal
      open={openUserBio}
      onClose={handleUserBioClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          style={{
            textAlign: "center",
            fontSize: "3.5vw",
            borderBottom: "2px solid white",
            fontFamily: "AtariFont",
            color: "yellow",
          }}
        >
          User Bio
        </div>
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            display: "flex",
            flexDirection: "column",
            color: "yellow",
            gap: "2vh",
            fontSize: "1.5vw",
          }}
        >
          <div style={{ textAlign: "left" }}>
            Player:{" "}
            <span style={{ color: "white" }}>{selectedPlayer?.nickname}</span>
          </div>
          <div style={{ textAlign: "left" }}>
            Rank:{" "}
            <span style={{ color: "white" }}>
              {selectedPlayer?.rank || "Unrated"}
            </span>
          </div>
          <div style={{ textAlign: "left" }}>
            Elo:{" "}
            <span style={{ color: "white" }}>
              {selectedPlayer?.elo || "Unrated"}
            </span>
          </div>
          <div style={{ textAlign: "left" }}>
            First Name:{" "}
            <span style={{ color: "white" }}>{selectedPlayer?.firstName}</span>
          </div>
          <div style={{ textAlign: "left" }}>
            Last Name:{" "}
            <span style={{ color: "white" }}>{selectedPlayer?.lastName}</span>
          </div>
          <div style={{ textAlign: "left" }}>
            Created:{" "}
            <span style={{ color: "white" }}>
              {selectedPlayer?.created.toDateString().toString()}
            </span>
          </div>
        </div>

        <Box
          sx={{ margin: 1, padding: "10px 10px" }}
          style={{ height: "30vh" }}
        >
          <div
            style={{
              fontFamily: "AtariFontSmooth",
              fontSize: "1.4vw",
              textDecoration: "underline",
              color: "yellow",
              paddingBottom: "10px",
            }}
          >
            Match History
          </div>
          <Paper
            style={{
              height: "90%",
              width: "100%",
              background: "rgba(204, 204, 204, 0.5)",
            }}
          >
            <TableVirtuoso
              data={rows}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
            />
          </Paper>
        </Box>

        <div className="input-group">
          <Button
            type="button"
            sx={{
              fontSize: "1.5vw",
              fontFamily: "AtariFontExtraSmooth",
              color: "white",
            }}
            variant={"outlined"}
            onClick={handleUserBioClose}
          >
            Exit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default UserBio;

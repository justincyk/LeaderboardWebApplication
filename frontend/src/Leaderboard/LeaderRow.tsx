// import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
// import ImageIcon from "@mui/icons-material/Image";
import { User } from "../User/User.ts";
import { ListItemButton } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

interface Column {
  id: "rank" | "name" | "wins" | "loses";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "rank", label: "Rank" },
  { id: "name", label: "Name" },
  {
    id: "wins",
    label: "Wins",
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "loses",
    label: "Loses",
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface LeaderPlayerProp {
  user: User;
}

const LeaderRow = ({ user }: LeaderPlayerProp) => {
  return (
    // <ListItemButton sx={{ border: "1px solid red", padding: "10px 10px" }}>
    //   <ListItemAvatar>
    //     <Avatar>
    //       <h3>{rank}</h3>
    //       {/*<ImageIcon />*/}
    //     </Avatar>
    //   </ListItemAvatar>
    //
    //   <ListItemText
    //     primary={user.name}
    //     secondary={user.created.toDateString()}
    //   />
    //   <ListItemText primary={10} />
    //   <ListItemText primary={12} />
    // </ListItemButton>
    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
      {columns.map((column) => {
        const value = user[column.id];
        return (
          <TableCell key={column.id} align={"center"}>
            {column.format && typeof value === "number"
              ? column.format(value)
              : value}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default LeaderRow;

// @ts-ignore
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { User } from "../User/User.ts";

interface UserBioProps {
  openUserBio: boolean;
  handleUserBioClose: () => void;
  users: User[];
}

const style = {
  position: "absolute" as "absolute",
  top: "43%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "54vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  // backgroundImage: `url("../images/guyPingpong.gif")`,
  // backgroundSize: "cover",
  // backgroundPosition: "center",
  color: "blue",
  fontFamily: "AtariFont",
};

const UserBio = ({ openUserBio, handleUserBioClose, users }: UserBioProps) => {
  useEffect(() => {}, [users]);

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

        <div className="input-group">
          <Button
            type="button"
            sx={{
              fontSize: "1.9vw",
              fontFamily: "AtariFontExtraSmooth",
              // color: "yellow",
              color: "white",
            }}
            variant={"outlined"}
            onClick={handleUserBioClose}
          >
            Cancel
          </Button>
          <div
            style={{
              textAlign: "center",
              fontSize: "1.2vw",
              paddingTop: "1.5rem",
              color: "yellow",
            }}
          >
            New players need at least 5 matches to be displayed on the
            Leaderboard
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default UserBio;

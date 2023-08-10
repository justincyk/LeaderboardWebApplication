// @ts-ignore
import React from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface AddPlayerProps {
  openAddPlayer: boolean;
  handleAddPlayerClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "54vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundImage: `url("../images/guyPingpong.gif")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
  fontFamily: "AtariFont",
};

const AddPlayer = ({ openAddPlayer, handleAddPlayerClose }: AddPlayerProps) => {
  return (
    <Modal
      open={openAddPlayer}
      onClose={handleAddPlayerClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h1"
          align={"center"}
          sx={{ borderBottom: 1, fontSize: "2.5rem", fontFamily: "AtariFont" }}
        >
          Add New Player
        </Typography>
        <form
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "15px",
            paddingTop: "1.5rem",
            paddingLeft: "1.5rem",
            fontSize: "1.7rem",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
              width: "50%",
            }}
          >
            <label htmlFor="firstName">Username</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter Username"
              style={{ width: "100%", fontSize: "1.3rem" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
              width: "50%",
            }}
          >
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              style={{ width: "100%", fontSize: "1.3rem" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
              width: "50%",
            }}
          >
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              style={{ width: "100%", fontSize: "1.3rem" }}
            />
          </div>

          <div className="input-group">
            <Button
              type="button"
              sx={{ fontSize: "1.3rem", color: "white" }}
              variant={"outlined"}
            >
              Save
            </Button>
            <span> </span>
            <Button
              type="button"
              sx={{ fontSize: "1.3rem", color: "white" }}
              variant={"outlined"}
              onClick={handleAddPlayerClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddPlayer;

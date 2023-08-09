// @ts-ignore
import React from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface AddPlayerProps {
  openAddPlayer: boolean;
  handleAddPlayerClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundImage: `url("../images/spaceBackground.jpeg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
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
          variant="h5"
          component="h1"
          align={"center"}
          sx={{ borderBottom: 1 }}
        >
          Add New Player
        </Typography>
        <form
          className="input-group vertical"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "15px",
            paddingTop: "10px",
            paddingLeft: "20px",
            fontSize: "20px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              width: "50%",
            }}
          >
            <label htmlFor="firstName">Username</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter Username"
              style={{ width: "100%" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              width: "50%",
            }}
          >
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              style={{ width: "100%" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              width: "50%",
            }}
          >
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              style={{ width: "100%" }}
            />
          </div>

          <div className="input-group">
            <button className="primary bordered medium">Save</button>
            <span> </span>
            <button type="button" className="bordered medium">
              Cancel
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddPlayer;

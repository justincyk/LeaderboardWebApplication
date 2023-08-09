// @ts-ignore
import React from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface AddMatchProps {
  openAddMatch: boolean;
  handleAddMatchClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundImage: `url("../images/pingpong.gif")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
  fontSize: "1.2rem",
  fontFamily: "AtariFont",
};

const AddMatch = ({ openAddMatch, handleAddMatchClose }: AddMatchProps) => {
  return (
    <Modal
      open={openAddMatch}
      onClose={handleAddMatchClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h1"
          align={"center"}
          sx={{
            borderBottom: 1,
            fontSize: "2.5rem",
            color: "#2563eb",
            fontFamily: "AtariFont",
          }}
        >
          Add New Match
        </Typography>
        <form
          className="input-group vertical"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "15px",
            paddingTop: "1.5rem",
            paddingLeft: "2rem",
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
            <label htmlFor="winner">Winner</label>
            <input
              type="text"
              name="winner"
              placeholder="Enter Winner"
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
            <label htmlFor="loser">Loser</label>
            <input
              type="text"
              name="loser"
              placeholder="Enter Loser"
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
            >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddMatch;

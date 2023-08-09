// @ts-ignore
import React from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface AddMatchProps {
  openAddMatch: boolean;
  handleAddMatchClose: () => void;
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
  backgroundImage: `url("../images/pingpong.gif")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
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
          sx={{ borderBottom: 1 }}
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
            <label htmlFor="winner">Winner</label>
            <input
              type="text"
              name="winner"
              placeholder="Enter Winner"
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
            <label htmlFor="loser">Loser</label>
            <input
              type="text"
              name="looser"
              placeholder="Enter Loser"
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

export default AddMatch;

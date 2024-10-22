// components/SizeChartModal.js
import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const SizeChartModal = ({url}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button onClick={handleOpen} className="text-blue-500 underline">
        Sizechart
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8, color: "gray" }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={url}
            alt="Size Chart"
            className="w-3/5 object-cover mx-auto"
          />
        </Box>
      </Modal>
    </>
  );
};

export default SizeChartModal;

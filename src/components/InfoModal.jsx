import * as React from "react";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function InfoModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <InfoIcon
        onClick={handleOpen}
        style={{ color: "var(--lightBlue)", cursor: "pointer" }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rewards Program
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Select a month and year or search by customer name. The table will
            populate the points of each customer for the last 3 months leading
            up to the month you selected. The data goes back to January 2021.
            Transaction points are rounded up for each month to benefit the
            customer.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

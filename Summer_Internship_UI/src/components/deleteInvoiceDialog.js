import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton,
  Typography,
  Snackbar,
} from "@material-ui/core";
import axios from "axios";

import { Close as CloseIcon } from "@material-ui/icons";

const initialDeleteArray = [];

export default function DeleteDialog({ onChange, deleteinvoice, invoice_ids }) {
  let [open, setOpen] = React.useState(false);

  let [error, setError] = React.useState(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onChange(!deleteinvoice);
  };

  const handleDeleteInvoice = () => {
    invoice_ids.map((id, index) => {
      axios
        .get(`http://localhost:8080/1805464/deleteinvoice?invoice_id=${id}`)
        .then(({ message }) => {
          if (message === "Success") {
            console.log("deleted");
            handleClick();
            handleDelete();
          } else {
            setError(message);
            handleClick();
            handleDelete();
          }
        });
    });

    window.location.reload(true);
  };

  return (
    <div>
      <Dialog
        open={deleteinvoice}
        onClose={handleDelete}
        aria-labelledby="form-dialog-title"
      >
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#2A3E4C",
          }}
        >
          <DialogTitle
            onClose={handleDelete}
            style={{ color: "white" }}
            id="form-dialog-title"
          >
            Delete Record(s)?
          </DialogTitle>
          <IconButton style={{ marginLeft: "auto" }} onClick={handleDelete}>
            {" "}
            <CloseIcon style={{ color: "#C0C6CA" }} />{" "}
          </IconButton>
        </Grid>
        <DialogContent style={{ backgroundColor: "#2A3E4C" }}>
          <Typography style={{ color: "#C0C6CA" }}>
            You'll lose your record(s) after this action. We can't recover them
            once you delete.
          </Typography>
          <Grid style={{ display: "flex", flexDirection: "row" }}>
            <Typography> Are you sure you want to </Typography>

            <Typography style={{ color: "#FF5E5E", marginLeft: "4px" }}>
              {" "}
              permanently delete
            </Typography>
            <Typography style={{ marginLeft: "4px" }}>them?</Typography>
          </Grid>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#2A3E4C" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={handleDelete}
            color="#14AFF1"
            style={{ borderColor: "#14AFF1", color: "#14AFF1" }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              handleDeleteInvoice();
            }}
            style={{ backgroundColor: "#14AFF1" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

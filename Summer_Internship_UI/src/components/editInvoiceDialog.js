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

const initialEditArray = [];

const initialState = {
  amount: 0.0,
  notes: "",
  id: 0,
};
export default function EditDialog({ onChange, editinvoice, invoice_ids }) {
  const [info, setInfo] = React.useState(initialState);
  let [open, setOpen] = React.useState(false);
  let [invoiceArray, setInvoiceArray] = React.useState(initialEditArray);
  let [error, setError] = React.useState(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    onChange(!editinvoice);
  };
  const handleEditNew = () => {
    const params = {
      amount: info.amount,
      notes: info.notes,
      id: invoice_ids,
    };

    axios
      .get(
        `http://localhost:8080/1805464/editinvoice?invoice_id=${params.id}&amount=${params.amount}&notes=${params.notes}`
      )
      .then(({ message }) => {
        if (message === "Success") {
          console.log("edited");
          handleClick();
          handleEdit();
        } else {
          setError(message);
          handleClick();
          handleEdit();
        }
        setInfo(initialState);
      });
  };
  return (
    <div>
      <Dialog
        open={editinvoice}
        onClose={handleEdit}
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
            onClose={handleEdit}
            style={{ color: "white" }}
            id="form-dialog-title"
          >
            Edit Invoice
          </DialogTitle>
          <IconButton style={{ marginLeft: "auto" }} onClick={handleEdit}>
            {" "}
            <CloseIcon style={{ color: "#C0C6CA" }} />{" "}
          </IconButton>
        </Grid>
        <DialogContent style={{ backgroundColor: "#2A3E4C" }}>
          <Grid style={{ display: "flex" }}>
            <Grid
              alignItems="left"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "250px",
                  height: "45px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    width: "130px",
                    fontSize: "12px",
                    height: "20px",
                    color: "#97A1A9",
                  }}
                >
                  {" "}
                  Invoice Amount{" "}
                </Typography>
                <TextField
                  type="number"
                  required
                  variant="outlined"
                  value={info.amount}
                  onChange={(e) => {
                    setInfo({ ...info, amount: e.target.value });
                  }}
                  InputProps={{
                    style: {
                      height: "30px",
                      borderColor: "#356680",
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "10px",
                  width: "300px",
                  height: "45px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    width: "130px",
                    fontSize: "12px",
                    height: "20px",
                    color: "#97A1A9",
                  }}
                >
                  {" "}
                  Notes{" "}
                </Typography>
                <TextField
                  multiline
                  rows={5}
                  required
                  variant="outlined"
                  value={info.notes}
                  onChange={(e) => {
                    setInfo({ ...info, notes: e.target.value });
                  }}
                  InputProps={{
                    style: {
                      marginLeft: "-30px",
                      borderColor: "#356680",
                      color: "white",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#2A3E4C" }}>
          <Button
            onClick={handleEdit}
            style={{ marginRight: "auto", color: "#14AFF1" }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setInfo(initialState);
            }}
            color="#14AFF1"
            style={{ borderColor: "#14AFF1", color: "#14AFF1" }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleEditNew();
              window.location.reload();
            }}
            style={{ backgroundColor: "#14AFF1" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

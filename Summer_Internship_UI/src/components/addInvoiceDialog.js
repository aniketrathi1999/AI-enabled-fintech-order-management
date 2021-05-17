import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Snackbar,
} from "@material-ui/core";

import { Close as CloseIcon } from "@material-ui/icons";
import axios from "axios";

const initialState = {
  invoice_id: 0,
  name_cust: "",
  cust_no: "",
  amount: 0,
  due_date: "",
  notes: "",
};

export default function AddInvoiceDialog({ onChange, add }) {
  const [info, setInfo] = React.useState(initialState);
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleAdd = () => {
    onChange(!add);
  };

  let disable =
    info.name_cust === "" ||
    info.cust_no === "" ||
    info.invoice_id === 0 ||
    info.amount === 0 ||
    info.due_date === "";

  const handleAddNew = () => {
    const params = {
      invoice_id: info.invoice_id,
      name_cust: info.name_cust,
      cust_no: info.cust_no,
      amount: info.amount,
      due_date: info.due_date,
      notes: info.notes,
    };

    axios
      .get(
        `http://localhost:8080/1805464/addinvoice?name_cust=${params.name_cust}&cust_no=${params.cust_no}&amount=${params.amount}&invoice_id=${params.invoice_id}&due_date=${params.due_date}&notes=${params.notes}`
      )
      .then(({ message }) => {
        if (message === "Success") {
          console.log("added");
          handleClick();
          handleAdd();
        } else {
          setError(message);
          handleClick();
          handleAdd();
        }
        setInfo(initialState);
      });
    //  .then(
    //    window.location.reload(true)
    //  );
  };

  return (
    <div>
      <Dialog
        open={add}
        onClose={handleAdd}
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
            onClose={handleAdd}
            style={{ backgroundColor: "#2A3E4C", color: "white" }}
            id="form-dialog-title"
          >
            <Typography> Add Invoice </Typography>
          </DialogTitle>
          <IconButton onClick={handleAdd} style={{ marginLeft: "auto" }}>
            {" "}
            <CloseIcon style={{ color: "#C0C6CA" }} />{" "}
          </IconButton>
        </Grid>
        <DialogContent style={{ backgroundColor: "#2A3E4C" }}>
          <Grid style={{ display: "flex" }}>
            <Grid style={{ display: "flex", flexDirection: "column" }}>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "#97A1A9",
                  width: "250px",
                  height: "45px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{ width: "130px", fontSize: "12px", height: "20px" }}
                >
                  {" "}
                  Customer Name{" "}
                </Typography>
                <TextField
                  required
                  variant="outlined"
                  borderColor="#356680"
                  value={info.name_cust}
                  error={info.name_cust === ""}
                  onChange={(e) => {
                    setInfo({ ...info, name_cust: e.target.value });
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
                  width: "250px",
                  height: "45px",
                  color: "#97A1A9",
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{ width: "130px", fontSize: "12px", height: "20px" }}
                >
                  {" "}
                  Customer No.{" "}
                </Typography>
                <TextField
                  type="number"
                  required
                  variant="outlined"
                  value={info.cust_no}
                  error={info.cust_no === ""}
                  onChange={(e) => {
                    setInfo({ ...info, cust_no: e.target.value });
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
                  Invoice No.{" "}
                </Typography>
                <TextField
                  type="number"
                  required
                  variant="outlined"
                  value={info.invoice_id}
                  error={info.invoice_id === 0}
                  onChange={(e) => {
                    setInfo({ ...info, invoice_id: e.target.value });
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
                  error={info.amount === 0}
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
            </Grid>

            <Grid>
              <Grid>
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
                    Due date{" "}
                  </Typography>
                  <TextField
                    type="date"
                    required
                    variant="outlined"
                    value={info.due_date}
                    error={info.due_date === ""}
                    onChange={(e) => {
                      setInfo({ ...info, due_date: e.target.value });
                    }}
                    InputProps={{
                      style: {
                        height: "30px",
                        marginLeft: "-30px",
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
          </Grid>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#2A3E4C" }}>
          <Button
            onClick={handleAdd}
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
            Clear
          </Button>
          <Button
            disabled={disable}
            variant="contained"
            onClick={() => {
              handleAddNew();
              window.location.reload();
            }}
            style={{ backgroundColor: disable ? "#97A1A9" : "#14AFF1" }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

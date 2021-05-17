import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CloseIcon from "@material-ui/icons/Close";
import formatter from "../utils/formatter";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
  TableHead,
  Tab,
  TableSortLabel,
} from "@material-ui/core";
import axios from "axios";

export default function CorrDialog({ onChange, viewCorr, invoice_ids, size }) {
  let [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCorr = () => {
    onChange(!viewCorr);
  };

  let totalAmount = 0;

  let len;
  let account_name;

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={viewCorr}
        onClose={handleCorr}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle
          id="max-width-dialog-title"
          style={{ background: "#2A3E4C" }}
        >
          <Grid
            style={{
              alignItems: "center",
              background: "#2A3E4C",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography style={{ color: "#FFFFFF", marginRight: "auto" }}>
              View Correspondance ({size})
            </Typography>
            <Typography style={{ color: "#FFFFFF", marginLeft: "auto" }}>
              {" "}
              View:
            </Typography>

            <Select
              style={{
                height: "35px",
                width: "183px",
                background: "#2A3E4C",
                marginLeft: "5px",
                borderColor: "#356680",
                color: "white",
              }}
              variant="outlined"
            >
              <MenuItem style={{ background: "#2A3E4C", coloir: "white" }}>
                Template 1
              </MenuItem>
              <MenuItem style={{ background: "#2A3E4C", color: "white" }}>
                Template 2
              </MenuItem>
            </Select>

            <IconButton>
              {" "}
              <CloseIcon style={{ color: "#C0C6CA" }} />{" "}
            </IconButton>
          </Grid>
        </DialogTitle>

        <DialogContent style={{ background: "#2A3E4C", marginTop: "-20px" }}>
          <Grid style={{ display: "flex", flexDirection: "row" }}>
            <Typography
              style={{
                fontWeight: "lighter",
                color: "#97A1A9",
                fontSize: "15px",
              }}
            >
              {" "}
              Subject:
            </Typography>
            <Typography
              style={{
                marginLeft: "5px",
                fontWeight: "bold",
                color: "#97A1A9",
                fontSize: "15px",
              }}
            >
              Invoice Details-{account_name}{" "}
            </Typography>
          </Grid>
          <Typography
            style={{
              fontWeight: "lighter",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            Dear Sir/Madam,{" "}
          </Typography>
          <Typography
            style={{
              fontWeight: "lighter",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            Greetings!{" "}
          </Typography>
          <Typography
            style={{
              fontWeight: "lighter",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            This is to remind you that there are one or more open invoices on
            your account. lease provide at your earliest convenience an update
            on the payment details or clarify the reason for the delay. If you
            have any specific issue with the invoice(s), please let us know so
            that we can address it to the correct Department. Please find the
            details of the invoices below:
          </Typography>
          <Table>
            <TableHead style={{ height: "3vh" }}>
              <TableCell
                align="left"
                size="medium"
                key={"customer_name"}
                style={{ color: "#97A1A9", fontSize: "2.5vh", width: "128px" }}
              >
                {" "}
                Invoice Number{" "}
              </TableCell>
              <TableCell
                align="left"
                size="medium"
                key={"customer_num"}
                style={{ color: "#97A1A9", fontSize: "2.5vh", width: "95px" }}
              >
                {" "}
                PO Number{" "}
              </TableCell>
              <TableCell
                align="right"
                size="medium"
                key={"order_id"}
                style={{ color: "#97A1A9", fontSize: "2.5vh", width: "128px" }}
              >
                {" "}
                Invoice Date{" "}
              </TableCell>
              <TableCell
                align="right"
                size="medium"
                key={"order_amt"}
                style={{ color: "#97A1A9", fontSize: "2.5vh", width: "127px" }}
              >
                {" "}
                Due Date
              </TableCell>
              <TableCell
                align="right"
                size="medium"
                key={"due_date"}
                style={{ color: "#97A1A9", fontSize: "2.5vh", width: "111px" }}
              >
                {" "}
                Order Currency{" "}
              </TableCell>
              <TableCell
                align="right"
                size="medium"
                key={"predicted_date"}
                style={{ color: "#97A1A9", fontSize: "2.5vh", width: "200px" }}
              >
                {" "}
                Open Amount{" "}
              </TableCell>
            </TableHead>
          </Table>
          <Table style={{ overflowY: "scroll" }}>
            <TableBody style={{ tableLayout: "fixed" }}>
              {invoice_ids.map((row, index) => {
                totalAmount = totalAmount + row.amount;

                return (
                  <TableRow
                    style={index % 2 ? { background: "#283A46" } : {}}
                    hover
                    tabIndex={-1}
                    key={row.invoice_id}
                  >
                    <TableCell
                      align="left"
                      size="small"
                      style={{
                        color: "white",
                        width: "128px",
                        borderBottom: "none",
                        fontSize: "2vh",
                        fontWeight: "lighter",
                      }}
                    >
                      {" "}
                      {row.invoice_id}{" "}
                    </TableCell>
                    <TableCell
                      align="left"
                      size="small"
                      style={{
                        color: "white",
                        width: "95px",
                        borderBottom: "none",
                        fontSize: "2vh",
                        fontWeight: "lighter",
                      }}
                    >
                      {" "}
                      {row.invoice_id}{" "}
                    </TableCell>
                    <TableCell
                      align="right"
                      size="small"
                      style={{
                        color: "white",
                        width: "124px",
                        borderBottom: "none",
                        fontSize: "2vh",
                        fontWeight: "lighter",
                      }}
                    >
                      {" "}
                      {row.doc_date}{" "}
                    </TableCell>
                    <TableCell
                      align="right"
                      size="small"
                      style={{
                        color: "white",
                        width: "105px",
                        borderBottom: "none",
                        fontSize: "2vh",
                        fontWeight: "lighter",
                      }}
                    >
                      {" "}
                      {row.due_date}{" "}
                    </TableCell>
                    <TableCell
                      align="right"
                      size="small"
                      style={{
                        color: "white",
                        width: "110px",
                        borderBottom: "none",
                        fontSize: "2vh",
                        fontWeight: "lighter",
                      }}
                    >
                      {" "}
                      {row.currency}{" "}
                    </TableCell>
                    <TableCell
                      align="right"
                      size="small"
                      style={{
                        color: "white",
                        width: "184px",
                        borderBottom: "none",
                        fontSize: "2vh",
                        fontWeight: "lighter",
                      }}
                    >
                      {" "}
                      {formatter(row.amount)}{" "}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Typography
            style={{
              marginTop: "15px",
              fontWeight: "bold",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            Total Amount To Be Paid: ${formatter(totalAmount)}
          </Typography>
          <Typography
            style={{
              fontWeight: "lighter",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            In case you have already made a payment for the above items, please
            send us the details to ensure the payment is posted. Let us know if
            we can be of any further assistance. Looking forward to hearing from
            you.
          </Typography>
          <Typography
            style={{
              fontWeight: "lighter",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            Kind Regards,
          </Typography>
          <Typography
            style={{
              fontWeight: "lighter",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            [Sender’s First Name][Sender’s Last Name]{" "}
          </Typography>
          <Typography
            style={{
              fontWeight: "lighter",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            Phone : [Sender’s contact number]{" "}
          </Typography>
          <Typography
            style={{
              fontWeight: "lighter",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            Fax : [If any]{" "}
          </Typography>
          <Typography
            style={{
              fontWeight: "lighter",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            Email : [Sender’s Email Address]{" "}
          </Typography>
          <Typography
            style={{
              fontWeight: "lighter",
              color: "#97A1A9",
              fontSize: "15px",
            }}
          >
            Company Name[Sender’s Company Name]
          </Typography>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#2A3E4C" }}>
          <Button
            onClick={handleCorr}
            style={{ marginleft: "auto", color: "#14AFF1" }}
          >
            Cancel
          </Button>

          <Button variant="contained" style={{ backgroundColor: "#14AFF1" }}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

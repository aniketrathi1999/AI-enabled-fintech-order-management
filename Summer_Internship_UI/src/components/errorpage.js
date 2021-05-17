import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
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
import { Close as CloseIcon } from "@material-ui/icons";

export default function ErrorPage(onChange, isEmpty, settingsearch) {
  const handleError = () => {
    onChange(isEmpty);
  };

  const clearSearch = () => {
    settingsearch("");
  };

  return (
    <div className="App" style={{ background: "#273D49CC" }}>
      <Dialog
        open={isEmpty}
        onClose={handleError}
        aria-labelledby="form-dialog-title"
      ></Dialog>
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <ErrorOutlineIcon style={{ color: "red" }} />
        <Typography style={{ color: "#FFFFFF", fontWeight: "bold" }}>
          No results found
        </Typography>
        <Typography
          size="sm"
          style={{ color: "#C0C6CA", fontWeight: "lighter" }}
        >
          Try adjusting your search to find what you are looking for.
        </Typography>
        <Button onClick={clearSearch} style={{ color: "#14AFF1" }}>
          Clear Search
        </Button>
      </Grid>
    </div>
  );
}

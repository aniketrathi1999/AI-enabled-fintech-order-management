import React, { useState, useEffect, useLayoutEffect } from "react";
import { pxToVh, pxToVw } from "../utils/theme";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import AddInvoiceDialog from "../components/addInvoiceDialog";
import EditDialog from "../components/editInvoiceDialog";
import formatter from "../utils/formatter";
import CorrDialog from "../components/correspondanceDialog";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  TableHead,
  CircularProgress,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core/styles";
import DeleteDialog from "./deleteInvoiceDialog";
import Typography from "@material-ui/core/Typography";

export default function Body() {
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(true);
  let [pageCount, setCount] = React.useState(0);
  let [searchPage, setSearchPage] = React.useState(0);
  let [addInvoice, setAddInvoice] = React.useState(false);
  let [editinvoice, setEditInvoice] = useState(false);
  let [deleteInvoice, setDeleteInvoice] = useState(false);
  let [search, setSearch] = React.useState("");
  let [check, setCheck] = useState(false);
  let [checkData, setCheckData] = useState([]);
  let [corres, setCorres] = useState(false);
  let [corrData, setCorrData] = useState([]);
  let [error, setError] = useState(null);
  let [isEmpty, setIsEmpty] = useState(false);

  let debouncer = null;

  const loadData = (currPage) => {
    if (pageCount !== -1) isNextFunc(true);
    if (isNext) {
      axios
        .get(
          `http://localhost:8080/1805464/searchinvoice?page=${currPage}&invoice_id=${search}&limit=10`
        )
        .then((response) => {
          setResponseData([...responseData, ...response.data]);
        })
        .then((response) => {
          if (response === null) {
            setIsEmpty(true);
          }
        })
        .then(() => {
          search.length > 0
            ? setSearchPage(searchPage + 1)
            : setCount(currPage + 1);
        })

        .then(() => {
          console.log(pageCount, isNext, responseData.length);
        })

        .catch((error) => {
          setError(error);
          console.log(error);
        });
    }
  };

  const loadMoreData = () => {
    if (search.length > 0 && search !== "") {
      loadData(searchPage);
    } else {
      loadData(pageCount);
      console.log(typeof responseData);
    }
  };

  useEffect(() => {
    if (pageCount === 0) {
      loadData(pageCount);
    }
  }, []);

  useEffect(() => {
    setResponseData([]);

    clearTimeout(debouncer);
    debouncer = setTimeout(() => {
      loadData(0);
    }, 1000);
  }, [search]);

  const handleAdd = () => {
    setAddInvoice(!addInvoice);
  };

  const handleDelete = () => {
    setDeleteInvoice(!deleteInvoice);
    console.log(deleteInvoice);
  };

  const handleCorres = () => {
    setCorres(!corres);
    console.log(corres);
  };

  const handleEdit = () => {
    setEditInvoice(!editinvoice);
    console.log(editinvoice);
  };

  const onselectAllClicked = (event) => {
    if (event.target.checked) {
      const cData = responseData.map((x) => x.invoice_id);
      setCheckData(cData);
      console.log(checkData, check);
      return;
    }
    console.log(checkData);
    setCheckData([]);
  };

  const onSingleSelect = (event, invoice_id) => {
    const selectedIndex = checkData.indexOf(invoice_id);
    let newSelected = [];

    setCorrData([]);

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(checkData, invoice_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(checkData.slice(1));
    } else if (selectedIndex === checkData.length - 1) {
      newSelected = newSelected.concat(checkData.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        checkData.slice(0, selectedIndex),
        checkData.slice(selectedIndex + 1)
      );
    }

    responseData.forEach((row) => {
      if (newSelected.includes(row.invoice_id)) {
        setCorrData([...corrData, row]);
      }
      console.log(corrData);
    });

    setCheckData(newSelected);
    console.log(checkData);
  };

  const isSelected = (invoice_id) => checkData.indexOf(invoice_id) !== -1;

  return (
    <div
      style={{
        fontSize: "2vh",
        height: "77vh",
        width: "219vh",
        paddingTop: "1vh",
        backgroundColor: "#273D49CC",
        borderRadius: "1vh",
      }}
    >
      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          width: "210vh",
          height: "5vh",
          marginLeft: "1vh",
          marginRight: "1vh",
        }}
      >
        <Button
          variant="contained"
          style={{
            fontSize: "2vh",
            width: "4.5vh",
            height: "5vh",
            backgroundColor: checkData.length > 0 ? "#14AFF1" : "#97A1A9",
          }}
        >
          Predict
        </Button>
        <Button
          onClick={handleCorres}
          disabled={checkData.length === 0}
          variant="outlined"
          style={{
            fontSize: "2vh",
            width: "35vh",
            height: "5vh",
            marginLeft: "1vh",
            borderColor: "#97A1A9",
            color: "#97A1A9",
          }}
        >
          View Correspondence
        </Button>
        <Button
          variant="outlined"
          disabled={checkData.length > 0}
          startIcon={<AddIcon />}
          onClick={handleAdd}
          style={{
            borderColor: "#14AFF1",
            color: "#FFFFFF",
            fontSize: "2vh",
            width: "4.5vh",
            height: "5vh",
            marginLeft: "70vh",
          }}
        >
          {" "}
          Add
        </Button>
        <Button
          variant="outlined"
          disabled={!(checkData.length === 1)}
          startIcon={<EditIcon />}
          onClick={handleEdit}
          style={{
            borderColor: "#97A1A9",
            color: "#97A1A9",
            fontSize: "2vh",
            width: "4.5vh",
            height: "5vh",
            marginLeft: "1vh",
          }}
        >
          {" "}
          Edit
        </Button>
        <Button
          variant="outlined"
          disabled={checkData.length === 0}
          onClick={handleDelete}
          startIcon={<RemoveIcon />}
          style={{
            borderColor: "#97A1A9",
            color: "#97A1A9",
            fontSize: "2vh",
            width: "15vh",
            height: "5vh",
            marginLeft: "1vh",
          }}
        >
          {" "}
          Delete
        </Button>
        <TextField
          style={{
            marginLeft: "2vh",
            fontSize: "1vh",
            width: "50vh",
            height: "4vh",
          }}
          placeholder="Search with invoice number"
          size="small"
          variant="outlined"
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(e.target.value);
            setResponseData([]);
          }}
          InputProps={{
            style: {
              height: "5vh",
              borderColor: "#14AFF1",
              color: "#97A1A9",
            },
            endAdornment: (
              <InputAdornment>
                <SearchIcon
                  color="#FFFFFF"
                  style={{ height: "4vh", width: "4vh", marginLeft: "1vh" }}
                />
              </InputAdornment>
            ),
          }}
        />
        <AddInvoiceDialog add={addInvoice} onChange={handleAdd} />
        <DeleteDialog
          deleteinvoice={deleteInvoice}
          onChange={handleDelete}
          invoice_ids={checkData}
        />
        <EditDialog
          editinvoice={editinvoice}
          onChange={handleEdit}
          invoice_ids={checkData}
        />
        <CorrDialog
          viewCorr={corres}
          onChange={handleCorres}
          invoice_ids={corrData}
          size={corrData.length}
        />
      </Grid>

      <Grid>
        <TableContainer>
          <Table style={{ fontSize: "3vh", overflowY: "auto" }}>
            <TableHead style={{ height: "3vh" }}>
              <TableRow>
                <TableCell padding="checkbox" style={{ borderBottom: "none" }}>
                  <Checkbox
                    indeterminate={
                      checkData.length > 0 &&
                      checkData.length < responseData.length
                    }
                    checked={
                      responseData.length > 0 &&
                      responseData.length === checkData.length
                    }
                    onChange={onselectAllClicked}
                    inputProps={{ "aria-label": "select all desserts" }}
                  />
                </TableCell>

                <TableCell
                  align="left"
                  size="medium"
                  key={"customer_name"}
                  style={{
                    color: "#97A1A9",
                    fontSize: "2.5vh",
                    width: pxToVw(128),
                  }}
                >
                  {" "}
                  Customer Name{" "}
                </TableCell>
                <TableCell
                  align="left"
                  size="medium"
                  key={"customer_num"}
                  style={{
                    color: "#97A1A9",
                    fontSize: "2.5vh",
                    width: pxToVw(95),
                  }}
                >
                  {" "}
                  Customer #{" "}
                </TableCell>
                <TableCell
                  align="right"
                  size="medium"
                  key={"order_id"}
                  style={{
                    color: "#97A1A9",
                    fontSize: "2.5vh",
                    width: pxToVw(128),
                  }}
                >
                  {" "}
                  Order ID{" "}
                </TableCell>
                <TableCell
                  align="right"
                  size="medium"
                  key={"order_amt"}
                  style={{
                    color: "#97A1A9",
                    fontSize: "2.5vh",
                    width: pxToVw(127),
                  }}
                >
                  {" "}
                  Invoice Amount
                </TableCell>
                <TableCell
                  align="right"
                  size="medium"
                  key={"due_date"}
                  style={{
                    color: "#97A1A9",
                    fontSize: "2.5vh",
                    width: pxToVw(111),
                  }}
                >
                  {" "}
                  Due Date{" "}
                </TableCell>
                <TableCell
                  align="right"
                  size="medium"
                  key={"predicted_date"}
                  style={{
                    color: "#97A1A9",
                    fontSize: "2.5vh",
                    width: pxToVw(200),
                  }}
                >
                  {" "}
                  Predicted Payment Date{" "}
                </TableCell>
                <TableCell
                  align="left"
                  size="medium"
                  key={"predicted_bucket"}
                  style={{
                    color: "#97A1A9",
                    fontSize: "2.5vh",
                    width: pxToVw(198),
                  }}
                >
                  {" "}
                  Predicted Aging Bucket{" "}
                </TableCell>
                <TableCell
                  align="left"
                  size="medium"
                  key={"notes"}
                  style={{
                    color: "#97A1A9",
                    fontSize: "2.5vh",
                    width: pxToVw(184),
                  }}
                >
                  {" "}
                  Notes{" "}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <Grid
          id="scrollableGrid"
          style={{ overflow: "auto", height: pxToVh(350), paddingTop: "1vh" }}
        >
          <TableContainer>
            <Table style={{ tableLayout: "fixed" }}>
              {/* <TableBody style={{ overflowY:'hidden'}}> */}

              <InfiniteScroll
                dataLength={responseData.length}
                next={loadMoreData}
                hasMore={isNext}
                scrollableTarget="scrollableGrid"
                loader={
                  <Grid
                    style={{
                      height: "80%",
                      marginLeft: "45%",
                      overflow: "hidden",
                    }}
                  >
                    <CircularProgress />
                  </Grid>
                }
              >
                {responseData.map((row, index) => {
                  const isItemSelected = isSelected(row.invoice_id);
                  const labelId = `table-checkbox-${index}`;

                  return (
                    <TableRow
                      style={
                        isItemSelected
                          ? { background: "#2A5368" }
                          : index % 2
                          ? { background: "#283A46" }
                          : {}
                      }
                      hover
                      onClick={(event) => onSingleSelect(event, row.invoice_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.invoice_id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        style={{ borderBottom: "none" }}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          style={{
                            color: isItemSelected ? "#14AFF1" : "#97A1A9",
                          }}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>

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
                        {row.name_cust}{" "}
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
                        {row.cust_no}{" "}
                      </TableCell>
                      <TableCell
                        align="right"
                        size="small"
                        id={labelId}
                        scope="row"
                        style={{
                          color: "white",
                          width: "124px",
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
                          width: "105px",
                          borderBottom: "none",
                          fontSize: "2vh",
                          fontWeight: "lighter",
                        }}
                      >
                        {" "}
                        {formatter(row.amount)}{" "}
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
                        {row.due_date}{" "}
                      </TableCell>
                      <TableCell
                        align="right"
                        size="small"
                        style={{
                          color: "white",
                          width: "198px",
                          borderBottom: "none",
                          fontSize: "2vh",
                          fontWeight: "lighter",
                        }}
                      >
                        {" "}
                        -{" "}
                      </TableCell>
                      <TableCell
                        align="left"
                        size="small"
                        style={{
                          color: "white",
                          width: "191px",
                          borderBottom: "none",
                          fontSize: "2vh",
                          fontWeight: "lighter",
                        }}
                      >
                        {" "}
                        -{" "}
                      </TableCell>
                      <TableCell
                        align="left"
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
                        {row.notes}{" "}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </InfiniteScroll>
              {/* </TableBody> */}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

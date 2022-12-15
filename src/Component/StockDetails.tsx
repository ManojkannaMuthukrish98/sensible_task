import type { FC } from "react";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { IStockDetails } from "../loader/FetchStockDetailsLoader";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  searchBox: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0px",
    background: "#B1B3B3FF",
  },
  tableContainer: {
    maxHeight: "84vh",
  },
  tableHeader: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "#00539CFF",
    },
  },
  tableBody: {
    background: "#EEA47FFF",
  },
});

const StockDetails: FC<IStockDetailsProps> = (props) => {
  const classes = styles();

  const navigate = useNavigate();

  const [searchedValue, setSearchedValue] = useState("");
  const handleSearch = (event: any) => {
    setSearchedValue(event.target.value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <div className={classes.searchBox}>
          <TextField
            id="search"
            label="Search Symbol or Name"
            variant="outlined"
            onChange={handleSearch}
          />
        </div>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Sector</TableCell>
                <TableCell>ValidTill</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {props.stockData.map(
                (detail) =>
                  (searchedValue !== ""
                    ? detail?.symbol
                        ?.toLocaleLowerCase()
                        .includes(searchedValue.toLocaleLowerCase()) ||
                      detail?.name
                        ?.toLocaleLowerCase()
                        .includes(searchedValue.toLocaleLowerCase())
                    : true) && (
                    <TableRow
                      key={detail.symbol}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bolder", cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/quotes/${detail.symbol}`);
                        }}
                      >
                        {detail.symbol}
                      </TableCell>
                      <TableCell>{detail.name}</TableCell>
                      <TableCell>{detail.sector}</TableCell>
                      <TableCell>{detail.validTill}</TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default StockDetails;

interface IStockDetailsProps {
  stockData: IStockDetails[];
}

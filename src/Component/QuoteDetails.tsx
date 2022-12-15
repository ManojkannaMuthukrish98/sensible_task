import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import type { FC } from "react";
import { IQuoteDetails } from "../loader/FetchQuotesDetailsLoader";
import moment from "moment";
import { queryInvalidation } from "../hooks/fetchingData";

const styles = makeStyles({
  searchBox: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0px",
    background: "#DAA03DFF",
  },
  tableContainer: {
    maxHeight: "84vh",
  },
  tableHeader: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "#195190FF",
    },
  },
  tableBody: {
    background: "#A2A2A1FF",
  },
});

const QuoteDetails: FC<IQuoteDetailsProps> = (props) => {
  const { quoteDetails, handleSort } = props;
  const classes = styles();
  const params = useParams();
  const [sort, setSort] = useState("");

  useEffect(() => {
    const utcTimeStamp = moment.utc().valueOf();
    const utcTimeStampV2 = moment
      .utc(quoteDetails[quoteDetails.length - 1].valid_till)
      .valueOf();
    let difference = utcTimeStampV2 - utcTimeStamp;
    const minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;
    const secondsDifference = Math.floor(difference / 1000);
    const milliSeconds = (minutesDifference * 60 + secondsDifference) * 1000;
    const milliSecondsV2 = milliSeconds <= 0 ? 3000 : milliSeconds;
    setTimeout(() => {
      queryInvalidation(["quotes_details"]);
    }, milliSecondsV2);
  }, [quoteDetails]);

  const handleSorting = (event: any) => {
    handleSort(event.target.value);
    setSort(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flex: 1,
            background: "#76528BFF",
            color: "white",
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {params.symbolName}
        </Typography>
        <div className={classes.searchBox}>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="sortTimeInput">Sort Time By</InputLabel>
            <Select
              labelId="sortTimeInput"
              id="sortTimeSelect"
              value={sort}
              onChange={handleSorting}
              autoWidth
              label="Sort Time by"
            >
              <MenuItem value={"asc"}>Ascending</MenuItem>
              <MenuItem value={"desc"}>Descending </MenuItem>
            </Select>
          </FormControl>
        </div>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>price</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>ValidTill</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {quoteDetails.map((quote) => (
                <TableRow
                  key={quote.price + quote.time}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bolder" }}
                  >
                    {Math.round(quote.price)}
                  </TableCell>
                  <TableCell>{quote.time}</TableCell>
                  <TableCell>{quote.valid_till}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default QuoteDetails;

interface IQuoteDetailsProps {
  quoteDetails: IQuoteDetails[];
  handleSort: (sort: string) => void;
}

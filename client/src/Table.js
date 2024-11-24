import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

const columns = [
  { id: "User Id", label: "Id", minWidth: 170 },
  { id: "First Name", label: "First Name", minWidth: 100 },
  { id: "Last Name", label: "Last Name", minWidth: 100 },
  { id: "Sex", label: "Sex", minWidth: 100 },
  { id: "Email", label: "Email", minWidth: 100 },
  { id: "Date of birth", label: "Date of birth", minWidth: 170 },
  { id: "Job Title", label: "Job Title", minWidth: 170 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 750,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);

  useEffect(() => {
    async function fetchData(page) {
      fetch(`http://127.0.0.1:8000/?skip=${page}&limit=100`) // api for the get request
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          let tempRespData = JSON.parse(res?.data) || [];
          let tempData = [...data, ...tempRespData];
          setData(tempData);
          setTotalRecord(res?.total_records);
        });
    }
    fetchData(page);
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row["Index"]}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {totalRecord && (
        <TablePagination
          component="div"
          count={totalRecord}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[100]}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

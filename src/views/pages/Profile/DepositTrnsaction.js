import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from "@material-ui/core";
import moment from "moment";
import NoDataFound from "src/component/NoDataFound";
import DataLoading from "src/component/DataLoading";
import { Pagination } from "@material-ui/lab";
import { sortAddress } from "src/utils";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  input_fild: {
    backgroundColor: "#ffffff6e",
    borderRadius: "5.5px",
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    height: "48px",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    borderRadius: "20px",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "& .MuiInputBase-input": {
      color: "#141518",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
  LoginBox: {
    paddingTop: "20px",
    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
      fontSize: "20px",
      color: "#fff!important",
      "& span": {
        fontWeight: "300",
      },
    },
  },
  TokenBox: {
    border: "solid 0.5px #e5e3dd",
    padding: "5px",
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  dailogTitle: {
    textAlign: "Center",
    "& h2": {
      color: "#141518",
      fontSize: "23px",
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  UploadBox: {
    border: "solid 0.5px #707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "110px",
  },
  input_fild22: {
    width: "100%",
    "& input": {
      height: "45px",
      border: 0,
    },
    "& .MuiInput-underline:before": {
      border: 0,
    },
  },
  dlflex: {
    "& div": {
      marginTop: "2rem",
      "& span": {
        border: "1px solid #e8e7e7",
        fontSize: "20px",
        padding: "7px",
        marginRight: "6px",
      },
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  table: {
    minWidth: 320,
  },
  table: {
    border: "1px solid #e5e3dd",
    "& th": {
      border: "1px solid #e5e3dd",
    },
    "& td": {
      border: "1px solid #e5e3dd",
    },
  },
  tbody: {
    "&:nth-of-type(even)": {
      backgroundColor: "#f3f3f3",
    },
  },
  tableCellStyle: {
    background: "#18c2defc",
    color: "#3e3eca",
    border: "1px solid #0f1069 !important",
  },
  cell: {
    color: "#000",
    background: "#fff",
  },
}));

export default function Login({
  donateList,
  updateList,
  loaderDonation,
  setPage,
  page,
  noOfPages,
  history,
  auth,
}) {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  return (
    <Box className={classes.LoginBox} mb={5}>
      {/* <Box className={classes.masBoxFlex}>
        <Typography variant="h6">Donation transaction</Typography>
      </Box> */}
      {donateList && donateList.length === 0 ? (
        <Box align="center" mt={4} mb={5}>
          <NoDataFound />
        </Box>
      ) : (
        <TableContainer className={classes.Paper} component={Paper}>
          {loaderDonation ? (
            <DataLoading />
          ) : (
            <Table className={classes.table} aria-label="simple table">
              <TableHead
                style={{
                  background:
                    "linear-gradient(180deg, #c04848 0%, #480048 100%)",
                }}
              >
                <TableRow>
                  <TableCell align="Center" className={classes.tableCellStyle}>
                    {t("proflie.srNo")}
                  </TableCell>
                  <TableCell align="Center" className={classes.tableCellStyle}>
                    {t("proflie.paymentDate")}
                  </TableCell>
                  {/* <TableCell align="Center" style={{ color: 'white' }}>
                    Coin name{' '}
                  </TableCell> */}
                  <TableCell align="Center" className={classes.tableCellStyle}>
                    {t("proflie.amount")}
                  </TableCell>
                  <TableCell align="Center" className={classes.tableCellStyle}>
                    {t("proflie.from")}
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                    {t("proflie.to")}
                  </TableCell>
                  <TableCell align="Center" className={classes.tableCellStyle}>
                    {t("proflie.receiptId")}
                  </TableCell>
                  <TableCell align="Center" className={classes.tableCellStyle}>
                    {t("proflie.status")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donateList &&
                  donateList?.map((row, index) => (
                    <TableRow className={classes.tbody} key={row.coinName}>
                      <TableCell
                        className={classes.cell}
                        align="Center"
                        component="th"
                        scope="row"
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell className={classes.cell} align="Center">
                        {moment(row?.updatedAt).format("DD-MM-YYYY hh:mm A")}
                        {/* {row.updatedAt} */}
                      </TableCell>
                      {/* <TableCell style={{ color: 'black' }} align="Center">
                        {row?.coinName ? row?.coinName : 'N/A'}
                      </TableCell> */}
                      <TableCell className={classes.cell} align="Center">
                        {row?.amount ? row?.amount : 0}&nbsp;{row?.coinName}
                      </TableCell>
                      <TableCell className={classes.cell} >
                        {auth?.userData?.ethAccount?.address
                          ? sortAddress(auth?.userData?.ethAccount?.address)
                          : "N/A"}
                      </TableCell>
                      <TableCell
                        style={
                          row?.toDonationUser?._id
                            ? { color: "blue", cursor: "pointer" }
                            : { color: "black" }
                        }
                        className={classes.cell}
                        align="Center"
                        onClick={() => {
                          if (row?.toDonationUser?._id) {
                            history.push({
                              pathname: "/user-profile",
                              search: row?.toDonationUser?._id,
                            });
                          }
                        }}
                      >
                        {row?.toDonationUser?.userName
                          ? row?.toDonationUser?.userName
                          : "N/A"}
                      </TableCell>
                      <TableCell className={classes.cell} align="Center">
                        {row?._id ? row?._id : "N/A"}
                      </TableCell>
                      <TableCell className={classes.cell} align="Center">
                        {row.transactionStatus}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
      {donateList && donateList.length >= 10 && (
        <Box mb={2} mt={2} display="flex" justifyContent="flex-start">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      )}
    </Box>
  );
}

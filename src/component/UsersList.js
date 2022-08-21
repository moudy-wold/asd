import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  makeStyles,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Typography,
  Paper,
  Container,
  Button,
  Grid,
  InputAdornment,
  Input,
  MenuItem,
  IconButton,
  Select,
  colors,
} from "@material-ui/core";
import NoDataFound from "src/component/NoDataFound";
import DataLoading from "src/component/DataLoading";
import SearchIcon from "@material-ui/icons/Search";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import Loader from "src/component/Loader";
import { Pagination } from "@material-ui/lab";
import ChildTableUser from "./Table/ChildTableUser";
import { UserContext } from "src/context/User";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  LoginBox: {
    paddingBottom: "50px",
  },
  websiteButton: {
    border: "solid 0.5px #707070",
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: "17.5px",
    color: "#141518",
    width: "100%",
    borderRadius: "0",
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    marginTop: "30px",
    "& h6": {
      fontSize: "28px",
      color: "#000",
    },
  },
  paddingContainer: {
    padding: "10px 30px",
    // background: "linear-gradient(70deg, #29084f, #130445)",
  },
  table: {
    minWidth: 320,
  },
  table: {
    border: "1px solid #0f1069",
    "& th": {
      border: "1px solid #0f1069",
    },
    "& td": {
      border: "1px solid #0f1069",
    },
  },
  createButton: {
    color: "#fff",
    backgroundImage: "linear-gradient(45deg, #240b36 30%, #c31432 90%)",
    margin: "0px 10px",
    // "@media(max-width:768px)": {
    //   display: "none",
    // },
  },
  whitebox: {
    background: "linear-gradient(70deg,  #25106a,#382e42)",
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "15px",
  },
  idtxt: {
    display: "flex",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    alignItems: "center",

    "@media(max-width:818px)": {
      display: "block",
    },
  },
  title: {
    color: "#FFF!important",
  },
  // search12: {
  //   border: "0.5px solid #e5e3dd",
  //   display: "flex",
  //   alignItems: "center",
  //   borderRadius: "6.5px",
  // },
  input_fild: {
    height: "48px !important",
    width: "100%",
    maxWidth: "500px",
    margin: "auto",
    borderBottom: "1px solid #ddd",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "& .MuiInputBase-input": {
      color: "#fff",
      height: "34px !important",
      "&::placeholder": {
        color: "#FFF!important",
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
  label: {
    color: "#FFF",
    padding: 0,
    "&:hover": {
      color: "#e145b9",
      cursor: "pointer",
    }
  },
  btn: {
    margin: "10px",
    border: "1px solid #ce09ff66",
    borderRadius: "10px",
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    color: "#fff",
    "&:hover": {
      marginRight: "10px",
      backgroundColor: "",
      transition: "all .3s ease-in-out",
      background: "linear-gradient(270deg, #ffd800, #cc00ff)!important",
      color: "#fff",
    },
  },
  tableCellStyle: {
    background: "#18c2defc",
    color: "#3e3eca",
    border: "1px solid #0f1069 !important",
  },
  userTypeClass: {
    borderBottom: "1px solid #ddd",
    "&>svg": {
      color: "#fff",
    },
  },
  teableCle: {
    color: "#817474",
    backgroundColor: "#f9cceb",
  },

}));

export default function UsersList() {
  const [t, i18n] = useTranslation();
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [allUserList, setAllUserList] = useState([]);
  const [fireSearch, setFireSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [noOfPages, setnoOfPages] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [filterData, setFilterData] = useState({
    userType: "",
    searchKey: "",
  });
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...filterData, [name]: value };

    setFilterData(temp);
  };
  const getAllUserListHandler = async (filter) => {
    setIsLoadingData(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.allUserList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          search: filter?.searchKey ? filter?.searchKey : null,
          type: filter?.userType ? filter?.userType : null,
          limit: 10,
          page: page,
        },
      });
      if (res.data.statusCode === 200) {
        // console.log('responseUserList----', res.data.result.docs)
        // const filterFun = res.data.result.docs.filter((data) => {
        //   return data?.userType === 'Creator'
        // })
        setAllUserList(res.data.result.docs);
        setIsLoadingData(false);
        setFireSearch(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingData(false);
    }
  };
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      getAllUserListHandler();
    }
  }, [window.localStorage.getItem("token")]);

  useEffect(() => {
    if (filterData.userType !== "" || filterData.searchKey !== "") {
      if (fireSearch) {
        getAllUserListHandler(filterData);
      }
    }
  }, [filterData, fireSearch]);

  const clearSearchFilter = () => {
    setFilterData({
      userType: "",
      searchKey: "",
    });
    setFireSearch(false);
    getAllUserListHandler();
  };
  return (
    <Box className={classes.paddingContainer}>
      <Box className={classes.LoginBox} mb={5}>
        <Box className={classes.masBoxFlex}>
          <Typography variant="h6" className={classes.title}>{t("users.usersList")}</Typography>
        </Box>
        {/* {donateList && donateList.length === 0 ? (
          <Box align="center" mt={4} mb={5}>
            <NoDataFound />
          </Box>
        ) : ( */}
        <Box className={classes.whitebox}>
          <Container className={classes.cont}>
            <Box className={classes.idtxt}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={8} className={classes.dlflex}>
                  <label className={classes.label}>{t("users.search")}</label>
                  <Input
                    color="secondary"
                    placeholder="Search by wallet Address or name"
                    className={classes.input_fild}
                    value={filterData.searchKey}
                    fullWidth
                    type="text"
                    name="searchKey"
                    onChange={_onInputChange}
                    endAdornment={
                      <InputAdornment position="end" >
                        <IconButton style={{ color: "#FFF", }}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={12} md={8} className={classes.dlflex}>
                  <label className={classes.label}>{t("users.selectUserType")} </label>
                  <Box>
                    <Select
                      fullWidth
                      value={filterData.userType}
                      name="userType"
                      onChange={_onInputChange}
                      className={classes.userTypeClass}
                    >
                      <MenuItem value="Creator">{t("users.creator1")}</MenuItem>
                      <MenuItem value="User">{t("users.subscriber")}</MenuItem>
                    </Select>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={12} md={8} className={classes.dlflex}>
                  <Box className={classes.buttonBox}>
                    <Button
                      color="secondary"
                      size="large"
                      variant="contained"
                      className={classes.btn}
                      onClick={() => setFireSearch(true)}
                    >
                      {t("users.apply")}
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.btn}
                      size="large"
                      color="primary"
                      onClick={clearSearchFilter}
                    >
                      {t("users.clear")}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <TableContainer className={classes.Paper} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead
              style={{
                background: "linear-gradient(180deg, #c04848 0%, #480048 100%)",
              }}
            >
              <TableRow>
                <TableCell align="Center" className={classes.tableCellStyle}>
                  {t("users.srNo")}
                </TableCell>
                <TableCell align="Center" className={classes.tableCellStyle}>
                  {t("users.img")}
                </TableCell>
                <TableCell align="Center" className={classes.tableCellStyle}>
                  {t("users.walletAddress")}
                </TableCell>
                <TableCell align="Center" className={classes.tableCellStyle}>{t("users.userssName")}
                </TableCell>
                <TableCell align="Center" className={classes.tableCellStyle}>{t("users.userType")}
                </TableCell>
                <TableCell align="Center" className={classes.tableCellStyle}>{t("users.action")}

                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allUserList &&
                allUserList?.map((row, index) => (
                  <ChildTableUser row={row} index={index} auth={auth} key={index} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={3}>{isLoadingData && <Loader />}</Box>
        <Box mt={3}>
          {!isLoadingData && allUserList && allUserList.length === 0 && (
            <NoDataFound />
          )}
        </Box>
        {allUserList && allUserList.length >= 10 && (
          <Box mb={2} mt={2} display="flex" justifyContent="flex-start">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        )}
        {/* )} */}
      </Box>
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import User from "src/component/User";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  InputBase,
} from "@material-ui/core";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { Search } from "@material-ui/icons";
import DataLoading from "src/component/DataLoading";
import { useHistory } from "react-router";
import { Pagination } from "@material-ui/lab";
import UserDeatilsCard from "src/component/UserDeatilsCard";
import { useTranslation } from "react-i18next";
import NoDataFound from "src/component/NoDataFound";
const useStyles = makeStyles((theme) => ({
  LoginBox: {
    // backgroundColor: "#441682 !important",
    minHeight: "661px",
    paddingTop: "40px",

    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
      "& span": {
        fontWeight: "300",
      },
    },
  },
  divider: {
    padding: "20px 10px",
  },
  TokenBox: {
    border: "solid 0.5px #e5e3dd",
    padding: "5px",
  },
  header: {
    textAlign: "center",
    color: "#FFF",
    margin: "40px auto 20px",
    borderRadius: "15px",
    width: "fit-content",
    padding: "10px",
    userSelect: "none",
    transition: "all .2s linear",
    "&:hover": {
      transform: "scale(1.1)",
      border: "1px solid #FFF",
    },
  },
  pagination: {
    "& ul li button": {
      background: "#9105bd",
      color: "#FFF",
    },
  },
  qwe: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Login() {
  const [t, i18n] = useTranslation();
  const classes = useStyles();
  const [userList, setUserList] = useState();
  const [search, setsearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [userListToDisplay, setUserListToDisplay] = useState([]);
  const history = useHistory();

  const getuser = async (cancelTokenSource) => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: Apiconfigs.latestUserList,
      data: {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      },
      params: {
        limit: 10,
        page: page,
        search: search,
        userType: "Creator",
      },
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsLoading(false);
        console.log("res0-------", res);
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setNoOfPages(res.data.result.pages);
            setUserListToDisplay(res.data.result.docs);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (search !== "") {
      getuser(cancelTokenSource);
    } else {
      setUserList();
      setPage(1);
      setNoOfPages(1);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [search, page]);

  return (
    <Box className={classes.LoginBox} mb={5}>
      <Container maxWidth="sm">
        <Box>
          {/* <h3 className={classes.header}>Results For:</h3> */}
          <h3 className={classes.header}> {t('creators.title')}</h3>
          <Box textAlign="center" mb={3}>
            <div className={classes.search}>
              {/* <Search /> */}
              {/* <InputBase
                onChange={(e) => setsearch(e.target.value)}
                fullWidth
                placeholder="User Name"
              /> */}
            </div>
          </Box>
        </Box>
      </Container>
      {isLoading ? (
        <DataLoading />
      ) : (
        <Container maxWidth="lg" className={classes.talentCart}>
          {userListToDisplay.length === 0 ? (
            <Box align="center" mt={4} mb={5}>
              <NoDataFound />
            </Box>
          ) : (
            ""
          )}
          <Grid container className={classes.qwe}>
            {/* <Slider {...setting} className="with100"> */}
            {userListToDisplay.map((data, i) => {
              return (
                <UserDeatilsCard data={data} indaex={i} callbackFn={getuser} key={i} />
              );
            })}
            {/* </Slider> */}
          </Grid>
        </Container>
      )}
      <Box display="flex" justifyContent="center" className={classes.pagination}>
        {noOfPages > 1 && (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        )}
      </Box>
    </Box>
  );
}

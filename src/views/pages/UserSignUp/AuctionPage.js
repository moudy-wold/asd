import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import NFTCard from "src/component/NFTCard";
import Bundlecard1 from "src/component/Bundelscard1";
import AuctionCard from "src/component/AuctionCard";
import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Slider from "react-slick";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import DataLoading from "src/component/DataLoading";
import UserDeatilsCard from "src/component/UserDeatilsCard";
import { FaSearch } from "react-icons/fa";
import NoDataFound from "src/component/NoDataFound";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "src/component/Loader";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  mass: {
    textAlign: "center",
    padding: "10px",
    fontFamily: "Poppins",
    fontSize: "21.5px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.51",
    letterSpacing: "normal",
    texAlign: "left",
    color: "#FFF",
    marginTop: "30px",
    transition: "all .2s linear",
    color: "#fff",
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    borderRadius: "15px",
    "&:hover": {
      transform: "scale(1.1)",
      border: "1px solid #FFF",
      background: "transparent",
    },
    "& p": {
      transition: ".2s",
    },
  },
  LoginBox: {
    background: "#441682",
    padding: "0px 0px",
    position: "relative",
  },
  namemas: {
    // width: "960px",
    // height: "1805.5px",
    padding: "1.5px 0 0",
    backgroundColor: "var(--white)",
    display: "flex",
    justifyContent: "center",
  },
  search: {
    border: "0.5px solid #e5e3dd",
    display: "flex",
    alignItems: "center",
    borderRadius: "6.5px",
  },
  box: {
    paddingleft: "0",
    flexWrap: "inherit",
  },
  gridbox: {
    "@media(max-width:1280px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
  img: {
    position: "absolute",
    top: "20%",
    right: "0%",
    zIndex: "0",
  },
}));
const dummyCardData = [
  {
    mediaUrl: "images/feed1.png",
    duration: "20Days",
    title: "dummyNFT",
    subscriberCount: "5",
    userId: {
      name: "Chirag Varshney",
      profilePic: "images/icon.png",
    },
    startingBid: "0.01",
    donationAmount: "2",
  },
];
const AuctionPage = () => {
  const classes = useStyles();
  const auth = useContext(UserContext);
  const history = useHistory();
  const [auctionList, setAuctionList] = useState([]);
  const [allNFTList, setAllNFTList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userListToDisplay, setUserListToDisplay] = useState([]);
  const [isLoadingCreators, setIsLoadingCreators] = useState(false);
  const [isLoadingBundles, setIsBundlesLoading] = useState(false);
  const [isLoadingAuctions, setIsLaodingAuctions] = useState(false);
  const [t, i18n] = useTranslation();
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    centerMode: false,
    // centerPadding: "60px",
    // className: "recomended",
    autoplay: false,
    autoplaySpeed: 3000,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
    ],
  };
  const settingsForBundelsCard = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    centerMode: false,
    // centerPadding: "60px",
    // className: "recomended",
    autoplay: false,
    autoplaySpeed: 3000,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
    ],
  };
  const auctionNftListHandler = async () => {
    setIsLaodingAuctions(true);
    await axios({
      method: "GET",
      url: Apiconfigs.allorder,
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result) {
            console.log("resultOfAuctionNFTS---", res.data.result);
            const filterFun = res.data.result.filter((data) => {
              return moment(data?.nftId?.time).unix() > moment().unix();
            });
            setAuctionList(res.data.result);
            setIsLaodingAuctions(false);
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLaodingAuctions(false);
      });
  };

  const listAllNftHandler = async () => {
    setIsBundlesLoading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.listAllNft,
      headers: {
        // token: window.localStorage.getItem('token'),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setAllNFTList(res.data.result);
        }
        setIsLoading(false);
        setIsBundlesLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsBundlesLoading(false);
        console.log(err.message);
      });
  };

  const getuser = async () => {
    setIsLoading(true);
    setIsLoadingCreators(true);
    axios({
      method: "GET",
      url: Apiconfigs.latestUserList,
      params: {
        limit: 10,
        userType: "Creator",
      },
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setUserListToDisplay(res.data.result.docs);
            setIsLoading(false);
            setIsLoadingCreators(false);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsLoadingCreators(false);
      });
  };

  useEffect(() => {
    // if (auth.userData?._id && auth.userLoggedIn) {
    auctionNftListHandler();
    listAllNftHandler();
    // }
  }, []);

  useEffect(() => {
    getuser();
  }, []);

  return (
    <Box className={classes.LoginBox} id="talentCreater">
      {/* {isLoading ? (
        <DataLoading />
      ) : ( */}
      <img src={`./images/hero-background.png`} className={classes.img} />
      <section style={{ position: "relative", zIndex: "9999" }}>
        <div id="home_section" className={classes.namemas}>
          <Typography
            className={classes.mass}
            onClick={() => history.push("/SearchResult")}
            style={{ cursor: "pointer" }}
          >
            {t('creators.title')}
          </Typography>
        </div>
        &nbsp;
        <Container maxWidth="lg" style={{ display: "flex" }}>
          {!isLoadingCreators && userListToDisplay.length === 0 ? (
            <Box align="center" mt={4} mb={5}>
              <NoDataFound />
            </Box>
          ) : (
            ""
          )}
          <Grid container style={{ display: "flex" }}>
            {" "}
            <Slider {...settings} className="width100" style={{ padding: "3px 60px", }}>
              {userListToDisplay.map((data, i) => {
                return (
                  <UserDeatilsCard
                    key={i}
                    data={data}
                    indaex={i}
                    callbackFn={getuser}
                  />
                );
              })}{" "}
            </Slider>
          </Grid>
          {isLoadingCreators && <Loader />}
        </Container>
        {/* {auth.userLoggedIn && auth.userData?._id && ( */}
        <>
          <div id="bundle_section" className={classes.namemas}>
            <Typography
              onClick={() => history.push("/bundles_home")}
              style={{ cursor: "pointer" }}
              className={classes.mass}
            >
              {t('bundles.title')}
            </Typography>
          </div>
          <Container maxWidth="lg" style={{ marginBottom: "50px" }}>
            {!isLoadingBundles && allNFTList.length === 0 ? (
              <Box align="center" mt={4} mb={5}>
                <NoDataFound />
              </Box>
            ) : (
              ""
            )}
            <Grid container style={{ paddingTop: "25px" }}>
              <Slider {...settingsForBundelsCard} className="width100" style={{ padding: "3px 60px", }}>
                {allNFTList &&
                  allNFTList.map((data, i) => {
                    return (
                      // <Grid
                      //   item
                      //   xs={12}
                      //   sm={6}
                      //   md={4}
                      //   lg={3}
                      //   className={classes.gridbox}
                      // >
                      <Bundlecard1
                        key={i}
                        data={data}
                        indaex={i}
                        callbackFn={listAllNftHandler}
                      />
                      // </Grid>
                    );
                  })}
              </Slider>
            </Grid>
            {isLoadingBundles && <Loader />}
          </Container>

          {/* Auction Section */}

          {/* <div className={classes.namemas} id="auctions">
            <Link style={{ marginLeft: "-30px" }} to="/auctions">
              <Typography
                style={{ marginTop: "-20px", marginBottom: "10px" }}
                className={classes.mass}
              >
                Auction
              </Typography>
            </Link>
          </div>
          <Container maxWidth="lg">
            {!isLoadingAuctions && auctionList.length === 0 ? (
              <Box align="center" mt={4} mb={5}>
                <NoDataFound />
              </Box>
            ) : (
              ""
            )}
            <Grid container style={{ marginBottom: "50px" }} spacing={1}>
              <Slider {...settings} className="width100">
                {auctionList.map((data, i) => {
                  return (
                    <Grid item xs={12} sm={12} md={12} lg={12} key={i}>
                      <NFTCard data={data} index={i} />
                    </Grid>
                  );
                })}
              </Slider>
            </Grid>
            {isLoadingAuctions && <Loader />}
          </Container> */}
        </>
        {/* )} */}
      </section>
      {/* )} */}
    </Box>
  );
};

export default AuctionPage;

// profiles  bandle cart
import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Input,
  Select,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { FiDownload } from "react-icons/fi";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import { sortAddress } from "src/utils";
import { useWeb3React } from "@web3-react/core";
import { FaHeart } from "react-icons/fa";
import {
  BNB_NETWORK,
  ACTIVE_NETWORK,
  CEO_NAME,
  networkList,
  getCoinkDetails,
} from "src/constants";
import { useHistory } from "react-router-dom";
import ButtonCircularProgress from "./ButtonCircularProgress";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({

  cards: {
    // background: "url(" + userCardData.profilePic + ")",
    // background: "url('./images/my-photo.jpg')",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    height: "70vh",
    // width: "220px",
    borderRadius: "15px",
    transition: ".2s",
    margin: "13px",
    "&:hover": {
      transform: "scale(1.02)",
    },
    "& .slick-list .slick-track": {
      width: "20%",
    },
  },
  NFTbg: {
    width: "100%",
    height: "100%!important",
    // height: "165px",
    // overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    backgroundColor: "#ccc !important",
    "& img": {
      width: "100%",
      height: "100%!important",
      // width: "-webkit-fill-available",
    },
  },
  contantCard: {
    display: "flex",
    flexDirection: "column",
    "&>div": {
      height: "100%",
    },
    height: "100%",
    position: "relative",
    "@media(max-width:821px)": {
      fontSize: "11px !important",
    },
  },

  contantCard2: {
    textAlign: "left",
    position: "relative",
    paddingTop: "10px",
    borderTop: "solid 0.5px #707070",
    "&::after": {
      position: "absolute",
      border: " solid 0.5px #707070",
      content: "''",
      left: "50%",
      top: "0",
      transform: "translatex(-50%)",
    },
  },
  btnBox: {
    display: "flex",
    alignItems: "center",
    "& button": {
      fontSize: "8px !important",
    },
  },
  sublink: {
    display: "flex",
    justifyContent: "space-between",
    color: "#000",
    alignItems: "center",
    paddingBottom: "10px",
    position: "relative",
    "&::after": {
      content: "''",
      height: " 1px",
      width: "70%",
      position: "absolute",
      backgroundColor: "#f2f1ee",
      bottom: "6px",
      maxWidth: "100%",
      left: "50%",
      transform: " translateX(-50%)",
    },
  },

  feedmenu: {
    fontSize: "20px",
    color: "#707070",
    position: "absolute",
    right: "0px",
    top: "0px",
    zIndex: "9",
  },
  donation: {
    "& span": {
      fontSize: "12px",
      padding: "2px 5px",
      border: "1px solid #ccc",
      color: "#FFF",
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      color: "#fff",
      height: "45px",
    },
  },
  changepic: {
    textAlign: "center",
    "& img": {
      width: "80%",
    },
    "& small": {
      position: "relative",
      fontSize: "12px !important",
      "& input": {
        position: "absolute",
        width: "300px",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: "0",
      },
    },
  },

  // cs
  PhotoBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "100%",
      // maxWidth: "280px",
      height: "368px",
      // marginLeft: "122px",
      paddingLeft: "149",
      display: "flex",
      alignItems: "center",
      borderRadius: "15px",
    },
    "@media(max-width:768px)": {
      "& img": {
        height: "auto",
      },
    },
  },
  bundleText: {
    "& .red": {
      color: "#792034",
    },
    "& h4": {
      color: "#141518",
      fontSize: "20px",
    },
  },
  deskiText: {
    "& h4": {
      marginBottom: "10px",
      color: "#707070",
      fontSize: "20px",
      "& span": {
        color: "#141518",
      },
    },
  },
  input_fild: {
    backgroundColor: "#ffffff6e",
    borderRadius: "5.5px",
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    width: "100%",
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
  dilogBody: {
    paddingBottom: "30px",
    position: "relative",
    "& small": {
      position: "absolute",
      bottom: " 3px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "13px",
      width: "100%",
      textAlign: "center",
    },
  },
  certificateimg: {
    margiBottom: "30px",
    width: "100%",
    height: "auto",
  },

  heding: {
    backgroundImage: "linear-gradient(to bottom, #792034, #3d101a)",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    alignItems: "center",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& img": {
      width: "60px",
      [theme.breakpoints.down("xs")]: {
        width: "20px",
      },
    },
    "& h6": {
      fontSize: "15px",
      fontWeight: "400",
      padding: "0 20px",
      [theme.breakpoints.down("xs")]: {
        padding: "0 5px",
        fontSize: "10px",
      },
    },
  },
  body: {
    position: "relative",
    zIndex: 2,
    padding: "50px 20px 150px 20px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 20px 60px 20px",
    },
    "& h5": {
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "1.53",
      color: "#141518",
    },
    "& h2": {
      fontSize: "23px",
      fontWeight: "600",
      lineHeight: "1.51",
      paddingLeft: "5px",
      color: "#141518",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
      },
    },
    "& img": {
      width: "30px",
      margin: "0 5px",
    },
  },
  footer: {
    "& h5": {
      fontSize: "15px",
      fontWeight: "500",
      lineHeight: "1.53",
      color: "#141518",
    },
    "& p": {
      fontSize: "10px",
      fontWeight: "500",
      lineHeight: "1.5",
      color: "#141518",
    },
    "& span": {
      fontSize: "9px",
      fontWeight: "500",
      lineHeight: "1.5",
      color: "rgba(112, 112, 112, 0.64)",
    },
    "& label": {
      fontSize: "10px",
      fontWeight: "400",
      lineHeight: "1.35",
      margin: "0",
      padding: "0",
      color: "#707070",
      whiteSpace: "initial !important",
      wordBreak: "break-all",
    },
  },
  certificateBox: {
    position: "relative",
  },
  centerImg: {
    position: "absolute",
    left: "50%",
    bottom: "30px",
    width: "45%",
    transform: "translateX(-50%)",
    zIndex: 1,
  },
  certificate: {
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "14px",
    "&>div": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
  },
  LoginButton: {
    marginTop: "10px",
    backgroundImage: "linear-gradient(45deg, #240b36 30%, #c31432 90%)",
    color: "#fff",
  },
  downloadButton: {
    maxWidth: "100px",
    backgroundColor: "#a33748",
    borderRadius: "33px",
    color: "white",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  nftimg: {
    // border: " solid 0.5px #e5e3dd",
    // height: "152px",

    flexBasis: "50%",
    // margin: "10px 0",
    textAlign: "center",
    overflow: "hidden",
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "18px",

      minWidth: "150px",
    },
  },
  nftImg: {
    flexBasis: "50%",
    height: "100%",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    // borderRadius: "40px 40px 10px 10px",
    // borderRadius: "18px",
    backgroundColor: "#ccc !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& video": {
      height: "100%",
    },
  },
  cardFooter: {
    userSelect: "none",
    flex: "1",
    height: "46%!important",
    margin: "auto",
    opacity: "0.8",
    transition: "all .2s linear",
    background: "#2f1385b8",
    gap: "10px",
    padding: "5px",
    width: "100%",
    zIndex: 10,
    // boxShadow: "0px 15px 18px #2f1385",
    borderRadius: "0 0 15px 15px",
    marginBottom: "10px",
    "&:hover": {
      opacity: "1",
    },
    "@media(max-width:910px)": {
      height: "54%!important"
    },

  },
  iconParent: {
    width: "8%",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: ".2s",
    marginRight: "12px",
    marginTop: "5px",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  userBtn: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    background: "tansparent",
    borderRadius: "16px",
    cursor: "pointer",
    outline: "0",
    padding: "0.7rem",
    position: "relative",
    transition: "all .1s ease-in-out !important",
    width: "48%",
    border: "1px solid #9821b7",
    margin: "auto 5px !important",
    textAlign: "center",

    "&:hover": {
      background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    },
    "& span": {
      color: "#FFF !important",
      transition: ".2s !important",
      fontSize: "15px",
      inlineSize: "160px",
      textalignL: "center",
    },
    "&:hover span": {
      margin: "0",
      fontSize: "normal",

    },
  },
  dialogParent: {
    "& div": {
      borderRadius: "15px",
    },
  },
  dialogContainer: {
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    // boxShadow: "5px 5px 15px #c100fb, -5px -5px 20px #22c37f",
    borderRadius: "15px",
  },
  btn: {
    fontSize: "17px",
    fontWeight: "500",
    margin: "0",
    backgroundSize: "100%!important",
    backgroundRepeat: "repeat!important",
    background: "linear-gradient(270deg, #c516f9, #3f9772)!important",
    "-webkitTextFillColor": "transparent!important",
    "-webkitBackgroundClip": "text!important",
    "&:hover": {
      backgroundSize: "100%!important",
      backgroundRepeat: "repeat!important",
      background: "linear-gradient(270deg, #ffd800, #cc00ff)!important",
      "-webkitTextFillColor": "transparent!important",
      "-webkitBackgroundClip": "text!important",
      border: "none !important",
      color: "#FFF",
    },
  }
}));

function Bundelscard1({ data, index, callbackFn }) {
  const [t, i18n] = useTranslation();
  const { account, chainId, library } = useWeb3React();
  const history = useHistory();
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [isDonate, setIsDonate] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [selectedBundalDetails, setSelectedBundalDetails] = useState();
  const [open3, setOpen3] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const { subscribers } = data;
  let isLike = false;
  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpenSubscribe(false);
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const subscribeNowHandler = async (isCheck) => {
    // const coinDetails = getCoinkDetails(data.coinName);
    // const isValid = isCheck
    //   ? parseFloat(data.donationAmount) <
    //       auth.userData[coinDetails.databaseKey] &&
    //     parseFloat(auth.userData.ethBalance) > 0.03
    //   : true;
    // if (isValid) {
    // if (parseFloat(auth?.userData?.massBalance) > 0) {
    setIsloading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.subscribeNow + data._id,
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {
          auth.updateUserData();

          toast.success("You have subscribed successfully");

          if (callbackFn) {
            callbackFn();
          }

          setOpen2(false);
        } else {
          toast.error(res.data.result);
        }
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err.message);
        toast.error(err?.response?.data?.responseMessage);
      });
    // } else {
    //   toast.error('Your wallet balance is insufficient')
    // }

    // } else {
    //   toast.error("Balance is low");
    //   setIsloading(false);
    // }
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const isVideo = data.mediaUrl.includes(".mp4");

  const userId =
    typeof data.userId === "object" &&
      !Array.isArray(data.userId) &&
      data.userId !== null
      ? data.userId._id
      : data.userId;
  const likeDislikeNfthandler = async (id) => {
    if (auth.userData?._id) {
      // if (auth.userData?._id !== userId) {
      try {
        const res = await axios.get(Apiconfigs.likeDislikeNft + id, {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          if (callbackFn) {
            callbackFn();
          }
        } else {
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
      // } else {
      //   toast.error("You can not like your bundle");
      // }
    } else {
      toast.error("Please login");
    }
  };

  if (auth.userData?._id) {
    const likeUser = data.likesUsers.filter(
      (data) => data === auth.userData._id
    );
    isLike = likeUser.length > 0;
  }

  let isUserSubscribed = false;
  if (auth.userData?._id) {
    const UserSubscribed = data.subscribers.filter(
      (data) => data === auth.userData._id
    );
    isUserSubscribed = UserSubscribed.length > 0;
  }
  const downLoadFile = () => {
    saveAs(data?.mediaUrl);
  };
  const updateDimensions = () => {
    if (data?._id) {
      let offsetWidth = document.getElementById(
        "imagecard" + data?._id
      ).offsetWidth;
      let newoofsetWidth = offsetWidth - 60;

      const videoCard = document.getElementById("imagecard" + data?._id + "1");
      if (videoCard) {
        document.getElementById("imagecard" + data?._id + "1").style.maxHeight =
          newoofsetWidth + 2 + "px";
        document.getElementById("imagecard" + data?._id).style.height =
          newoofsetWidth + 2 + "px";
      } else {
        document.getElementById("imagecard" + data?._id).style.height =
          newoofsetWidth + "px";
      }
    }
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const unSubscribeNowHandler = async (isCheck) => {
    const coinDetails = getCoinkDetails(data.coinName);
    setIsloading(true);
    await axios({
      method: "DELETE",
      url: Apiconfigs.unSubscription + data?._id,
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {
          setIsloading(false);
          auth.updateUserData();
          toast.success("You have unsubscribed successfully.");

          if (callbackFn) {
            callbackFn();
          }

          setOpen2(false);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <Box className={classes.cards} item xs={12} md={6} lg={2} >
      {/* Start Card */}
      <Box className={classes.contantCard}>

        {/* video Or Image */}
        <Box
          className={classes.nftmg}
          onClick={() =>
            history.push({
              pathname: "/bundles-details",
              search: data?._id,
            })
          }
          style={{ cursor: "pointer" }}
        >
          {/* video */}

          {isVideo ? (
            <Box
              id={`imagecard${data?._id}`}
              className={classes.nftImg}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <video
                width="100%"
                style={{
                  cursor: "pointer",
                  background: "#000",
                }}
                controls
                onClick={handleClickOpen2}
                id={`imagecard${data?._id}1`}
              >
                <source
                  src={data?.mediaUrl ? data?.mediaUrl : ""}
                  // src={"../../public/images/tell.mp4"}
                  type="video/mp4"
                />
              </video>
            </Box>
          ) : (

            //  Image 
            <Box
              id={`imagecard${data?._id}`}
              className={classes.nftImg}
              style={{
                background: "url(" + data.mediaUrl + ")",
                // background: "url('./images/my-photo.jpg')",
              }}
            ></Box>
          )}
        </Box>
        {/* End Video Or Image */}


        {/* Start texts And Buttons  Card Footer*/}
        <Box className={classes.cardFooter}>
          {/* Start Creator */}
          <Typography
            variant="h6"
            component="h6"
            style={{ color: "#fff", fontWeight: "400", textAlign: "left", marginLeft: "10px", fontSize: "16px", }}
          >
            <span style={{ color: "#fff", textAlign: "center", }}>
              {t('users.Specialty')}
              {/* {t('users.creator1')} */}
            </span>{" "}
            {/* {data?.duration ? data?.duration : ""} */}
          </Typography>
          {/* End Creator */}

          {/* Start Donation Amount */}
          <Typography
            variant="h6"
            component="h6"
            style={{ color: "#fff", fontWeight: "400", textAlign: "left", marginLeft: "10px", fontSize: "16px", }}
          >
            <span style={{ color: "#fff" }}>
              {t('users.donationAmount')}
            </span>
            {data?.donationAmount ? ("(" + data?.donationAmount + ")") : "(0)"}{" "}
            {data && data.coinName ? data.coinName : "MAS"}
          </Typography>
          {/* End Donation Amount */}

          {/* start  number Of Sub */}
          <Typography
            variant="h6"
            component="h6"
            style={{ color: "#fff", fontWeight: "400", textAlign: "left", marginLeft: "10px", fontSize: "16px", }}
          >
            <span style={{ color: "#fff", textAlign: "center", }}>
              {t('users.numberOfSubscribers')}
            </span>{" "}
            {data.subscriberCount ? data.subscriberCount : ""}
          </Typography>
          {/* End  number Of Sub */}

          {/* Start  duration */}
          <Typography
            variant="h6"
            component="h6"
            style={{ color: "#FFF", fontWeight: "400", textAlign: "left", marginLeft: "10px", fontSize: "16px", }}
            onClick={() => {
              history.push({
                pathname: "/user-profile",
                search: data.userId._id,
              });
            }}
            className="seats"
          >
            <span style={{ color: "#fff", textAlign: "center", }}>
              {t('users.duration')}
            </span>
            {data && data.userDetail && data.userDetail.name
              ? data.userDetail.name
              : data.userId.name}
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          </Typography>
          {/* End  duration */}

          {/* Start Name And Like */}
          <Box display="flex" justifyContent="space-between">
            {/* Start Name */}
            <Box>
              <Typography
                variant="h6"
                component="h6"
                className="textOverflow seats"
                style={{
                  color: "#0093ff",
                  width: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                }}
              >
                {/* {data?.bundleName ? data?.bundleName : ""} */}
              </Typography>
            </Box>
            {/* End Name */}

            {/* Start  Like */}
            <Box className={classes.iconParent}>
              <FaHeart
                style={
                  isLike
                    ? { color: "red", cursor: "pointer", fontSize: "20px" }
                    : { cursor: "pointer", color: "#FFF", fontSize: "20px" }
                }
                onClick={() => likeDislikeNfthandler(data?._id)}
              />
            </Box>
          </Box>
          {/* End Like */}

          {/* start  buttons Groups*/}
          <Box className={classes.buttonGroup}>
            {/* Start  UnSubscribe And ReViwe Buttns */}
            <Box style={{ display: "flex" }}>
              {auth.userData &&
                auth.userLoggedIn &&
                auth.userData._id !== userId &&
                isUserSubscribed && (
                  <Button
                    fullWidth
                    onClick={handleClickOpen2}
                    className={classes.userBtn}
                  >
                    {t('users.renew')}
                  </Button>
                )}
              {auth.userData &&
                auth.userLoggedIn &&
                auth.userData._id !== userId &&
                isUserSubscribed && (
                  <Button fullWidth onClick={unSubscribeNowHandler}
                    className={classes.userBtn}>
                    {t('users.unsubscribe')}
                  </Button>
                )}
            </Box>
            {/* End UnSubscribe And ReViwe Buttns */}

            {/* Start Subscribe And Viwe Buttns */}
            <Box>
              {
                // auth.userData &&
                //   auth.userLoggedIn && 
                auth?.userData?._id !== userId && !isUserSubscribed && (
                  <Button
                    //  fullWidth onClick={handleClickOpen2}
                    className={classes.userBtn}>
                    {t('users.subscribe')}
                  </Button>
                )
              }
              {auth.userData &&
                auth.userLoggedIn &&
                auth.userData._id === userId && (
                  <Button
                    fullWidth
                    onClick={() =>
                      history.push({
                        pathname: "/bundles-details",
                        search: data?._id,
                      })
                    }
                    className={classes.userBtn}
                  // onClick={handleClickOpen2}
                  >
                    {t('users.view')}
                  </Button>
                )}
            </Box>
            {/* End Subscribe And Viwe Buttns */}

          </Box>
          {/* End Buttons Groups */}

        </Box>
        {/* End texts And Buttons Crd Footer */}
      </Box>

      {/* edit */}
      {isDonate && selectedBundalDetails && (
        <DonationPopUp
          open={isDonate}
          handleClose={() => {
            setIsDonate(false);
            setSelectedBundalDetails();
          }}
          userData={selectedBundalDetails.userId}
        />
      )}

      {/* edit */}
      {open && (
        <Dialog
          open={open}
          fullWidth="sm"
          maxWidth="sm"
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent style={{ background: "#39373a", }}>
            <DialogContentText id="alert-dialog-description">
              <Typography
                variant="h4"
                align="center"
                style={{ color: "#FFF", margiBottom: "10px" }}
              >
                {data.bundleTitle}
              </Typography>

              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <label style={{ color: "#FFF" }}>
                      {t("bundles.donationAmount")}
                    </label>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      id="standard-basic"
                      placeholder="30"
                      className={classes.input_fild2}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box
                style={{
                  paddingBotton: "10px",
                  borderBottom: "solid 0.5px #e5e3dd",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <label style={{ color: "#FFF" }}>{t('users.duration')}</label>
                  </Grid>
                  <Grid item xs={12} md={8} className={classes.donation}>
                    <span>{t('users.days7')}</span>
                    <span>{t('users.days14')}</span>
                    <span>{t('users.days30')}</span>
                    <span>{t('users.days60')}</span>
                    <span>{t('users.years')}</span>
                    <span>{t('users.forEvar')}</span>
                  </Grid>
                </Grid>
              </Box>

              <Box align="center">
                <label style={{ color: "#FFF" }}> {t("users.services")}</label>
                <Typography
                  variant="body2"
                  componant="p"
                  style={{ color: "#000", fontSize: "20px" }}
                >
                  {t('users.iWillSend')} <br />
                  {t('users.specially')}
                </Typography>
              </Box>
              <Box mt={2} className={classes.changepic}>
                <small>
                  {t('users.changePH_VI')}
                  <input type="file" />
                </small>
                <img src="images/Rectangle.png" />
              </Box>
              <Box mt={4}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item md={4}>
                    <Link style={{ color: "#000" }} onClick={handleClose}>
                      {t('users.deleteBundles')}
                    </Link>
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      variant="contained"
                      className="btn-block removeredius"
                      onClick={handleClose}
                    >
                      {t('users.cancel')}
                    </Button>
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      className="btn-block removeredius ml-10"
                      onClick={handleClose}
                    >
                      {t('users.saveChanges')}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
      {/* view */}
      {open1 && (
        <Dialog
          open={open1}
          fullWidth="sm"
          maxWidth="sm"
          onClose={handleClose1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography
                variant="h4"
                align="center"
                style={{ color: "#792034", margiBottom: "10px" }}
              >
                {t('users.bundleI')}
              </Typography>
              <Typography
                variant="h6"
                align="center"
                style={{ color: "#000", borderBottom: "solid 0.5px #e5e3dd" }}
              >
                {" "}
                {t('users.myBasicSupporter')}
              </Typography>

              <Box align="center" mt={3}>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ color: "#000", fontWeight: "400" }}
                >
                  <span style={{ color: "#707070" }}>
                    {t('users.donationAmount')}
                  </span>
                  MAS{" "}
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ color: "#000", fontWeight: "400" }}
                >
                  <span style={{ color: "#707070" }}>{t('users.duration')} </span>{t('users.oneMounth')}
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ color: "#000", fontWeight: "400" }}
                >
                  <span style={{ color: "#707070" }}>
                    {t('users.numberOfSubscribers')}{" "}
                  </span>
                  100
                </Typography>
              </Box>

              <Box align="center">
                <label> Services:</label>
                <Typography
                  variant="body2"
                  componant="p"
                  style={{ color: "#000", fontSize: "20px" }}
                >
                  {t('users.iWillSen')} <br />
                  {t('users.specially')}
                </Typography>
              </Box>
              <Box mt={2} className={classes.changepic}>
                <img src="images/Rectangle.png" />
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
      {/* Subscribe now */}
      {open2 && (
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={open2}
          onClose={handleClose2}
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick={isLoading}
          disableEscapeKeyDown={isLoading}
        >
          <DialogContent>
            <Box className={classes.PhotoBox}>
              {isVideo ? (
                <div>
                  <video width="100%" controls>
                    <source src={data.mediaUrl} type="video/mp4" />
                  </video>
                  {auth.userData &&
                    auth.userLoggedIn &&
                    auth.userData._id !== userId &&
                    isUserSubscribed && (
                      <Box>
                        <Grid
                          lg={12}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className={classes.downloadButton}
                            fullWidth
                            onClick={downLoadFile}
                          >
                            {t('users.downlaod')}
                          </Button>
                        </Grid>
                      </Box>
                    )}
                </div>
              ) : (
                <img
                  src={data.mediaUrl}
                  alt=""
                // style={{ height: '368px', width: '553px' }}
                />
              )}
              {/* <img src={data.mediaUrl} alt="" /> */}
            </Box>
            <Box mt={3} className={classes.bundleText} textAlign="center">
              <Typography variant="h4" className="red seats">
                {data.bundleTitle}
              </Typography>
            </Box>

            <Box mt={2} className={classes.deskiText}>
              <Typography variant="h4" align="left" color="textSecondary">
                {t('users.donationAmount')} {" "}
                <span>
                  {data.donationAmount} {data.coinName}
                </span>
              </Typography>
              <Typography variant="h4" align="left" color="textSecondary">
                {t('users.duration')}<span> {data.duration}</span>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4" align="left" color="textSecondary">
                    {t('users.details')}{" "} <span>{data?.details}</span>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {!auth.userLoggedIn && (
              <Box mt={3} mb={3} textAlign="center">
                {" "}
                <Button className={classes.LoginButton} onClick={handleClose2}>
                  {t('users.cancel')}
                </Button>
                &nbsp;&nbsp;{" "}
                <Button
                  className={classes.LoginButton}
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  {t('users.login')}
                </Button>
              </Box>
            )}
            {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id !== data.userId && (
                <Box mt={3} mb={3} textAlign="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => {
                      handleClose2();
                    }}
                    disabled={isLoading}
                  >
                    {t('users.cancel')}
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  {auth.userData &&
                    auth.userLoggedIn &&
                    auth.userData._id !== userId && (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={subscribeNowHandler}
                        // onClick={() => {
                        //   if (auth?.userData.userType === "User") {
                        //     subscribeNowBlockchainHandler(data);
                        //   } else {
                        //     subscribeNowHandler(true);
                        //   }
                        // }}
                        disabled={isLoading}
                      >
                        {isLoading ? "pending..." : "Subscribe now"}{" "}
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    )}
                </Box>

                // <Box>
                // {!auth.userLoggedIn && (
                //   <Button
                //     className={classes.LoginButton}
                //     onClick={() => {
                //       history.push("/login");
                //     }}
                //   >
                //     Login
                //   </Button>
                // )}
                // </Box>
              )}
          </DialogContent>
        </Dialog>
      )}

      {/* enter amount */}
      {open3 && (
        <Dialog
          open={open3}
          fullWidth="sm"
          maxWidth="sm"
          onClose={handleClose3}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent className={classes.dilogBody}>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="h4" align="center" style={{ color: "#000" }}>
                {t('users.enterAMount')}
              </Typography>
              <Box mt={4}>
                <Input
                  placeholder="300"
                  className={classes.input_fild2}
                  endAdornment={
                    <InputAdornment position="end">
                      {t('users.selectAToken')}
                    </InputAdornment>
                  }
                />
              </Box>

              <Box mt={4}>
                <Typography
                  variant="h4"
                  align="center"
                  style={{ color: "#000" }}
                >
                  {t('users.sendMessage')}
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  className={classes.input_fild}
                  defaultValue="Default Value"
                  variant="outlined"
                />
              </Box>
              <Box mt={2} mb={4}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className="btnWidth btn-block btnHight"
                // onClick={handleClickOpen5}
                >
                  {t('users.donateNow')}
                </Button>
              </Box>
              <small>{t('users.ETHFees')}</small>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}

export default React.memo(Bundelscard1);

export const DonationPopUp = ({ open, handleClose, userData }) => {
  const [t, i18n] = useTranslation();
  const { account, chainId, library } = useWeb3React();
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [isLoading, setIsloading] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedBlockChain, setSelectedBlockChain] = useState("select");
  const [donationMessage, setDonationMessage] = useState("");
  const [serialNumber, setSerialNumber] = useState("f");
  const [download, setDownload] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);

  const [isopenDonate, setIsopenDonate] = useState(false);

  useEffect(() => {
    setIsopenDonate(open);
  }, [open]);

  useEffect(() => {
    if (selectedBlockChain !== "select" && chainId) {
      if (selectedBlockChain.chainId !== chainId) {
        swichNetworkHandler(selectedBlockChain.chainId);
      }
    }
  }, [selectedBlockChain, chainId]);

  const swichNetworkHandler = async (chainId) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x" + parseFloat(chainId).toString(16),
            },
          ],
        });
      } catch (error) {
        console.log("ERROR", error);
        // toast.warn(error.message);
        if (error.code === 4902) {
        }
      }
    }
  };

  // const donationHandler = async (isCheck) => {
  //   if (selectedBlockChain !== "select") {
  //     const checkMassBalanceCondition = isCheck
  //       ? parseFloat(donationAmount) <
  //         parseFloat(auth.userData[selectedBlockChain.databaseKey])
  //       : true;

  //     const checkEthBalanceCondition = isCheck
  //       ? Number(auth.userData.ethBalance) > 0.03
  //       : true;
  //     if (checkMassBalanceCondition) {
  //       if (checkEthBalanceCondition) {
  //         try {
  //           setIsloading(true);

  //           const res = await axios.post(
  //             Apiconfigs.donation,
  //             {
  //               amount: donationAmount,
  //               userId: userData._id,
  //               coinName: selectedBlockChain.name,
  //               message: donationMessage,
  //             },
  //             {
  //               headers: {
  //                 token: window.localStorage.getItem("token"),
  //               },
  //             }
  //           );

  //           toast.success(res.data.responseMessage);
  //           setIsloading(false);
  //           console.log("Cerificate", res.data);
  //           if (res.data.statusCode === 200) {
  //             setSerialNumber(res.data.result);
  //             setOpenCertificate(true);
  //           }
  //           setTimeout(() => {}, 100);
  //           auth.updateUserData();
  //         } catch (error) {
  //           setIsloading(false);
  //           if (error.response) {
  //             toast.error(error.response.data.responseMessage);
  //           } else {
  //             toast.error(error.message);
  //           }
  //           console.log("Error", error);
  //         }
  //       } else {
  //         toast.error("Your ETH balance is too low");
  //         setIsloading(false);
  //       }
  //     } else {
  //       toast.error(`Your ${selectedBlockChain.name} balance is too low`);
  //       setIsloading(false);
  //     }
  //   }
  // };

  // const makeDonationBlockChain = async () => {
  //   if (donationAmount !== "" && selectedBlockChain !== "select") {
  //     try {
  //       console.log("selectedBlockChain", selectedBlockChain);

  //       console.log("library", library);
  //       const cnotractObj = await getContract(
  //         selectedBlockChain.tokenAddress,
  //         IERC20ABI,
  //         library,
  //         account
  //       );
  //       console.log("cnotractObj", cnotractObj);
  //       var balance = 0;
  //       if (
  //         selectedBlockChain.name === "BNB" ||
  //         selectedBlockChain.name === "ETH"
  //       ) {
  //         balance = await cnotractObj.provider.getBalance(account);
  //         console.log("--", ethers.utils.formatEther(balance));
  //       } else {
  //         balance = await cnotractObj.balanceOf(account);
  //         console.log("balance", balance);
  //       }
  //       if (
  //         parseFloat(donationAmount) <
  //         parseFloat(ethers.utils.formatEther(balance.toString()))
  //       ) {
  //         setIsloading(true);

  //         if (
  //           selectedBlockChain.name === "BNB" ||
  //           selectedBlockChain.name === "ETH"
  //         ) {
  //           const tx = await cnotractObj.signer.sendTransaction({
  //             to: userData.ethAccount.address,
  //             value: ethers.utils.parseEther(donationAmount),
  //           });
  //           console.log("tx", tx);
  //           await tx.wait();

  //           donationHandler(false);
  //         } else {
  //           const tranObj = await cnotractObj.transfer(
  //             userData.ethAccount.address,
  //             ethers.utils.parseEther(donationAmount)
  //           );
  //           await tranObj.wait();
  //           donationHandler(false);
  //         }
  //       } else {
  //         toast.error("Your balance is too low");
  //         setIsloading(false);
  //       }
  //     } catch (error) {
  //       setIsloading(false);

  //       if (error.response) {
  //         toast.error(error.response.data.responseMessage);
  //       } else {
  //         toast.error(error.message);
  //       }
  //       console.log("ERROR", error);
  //     }
  //   } else {
  //     toast.error("Please enter amount");
  //     setIsloading(false);
  //   }
  // };

  const donloadBadge = () => {
    setDownload(true);
    const certificate = document.getElementById(`certificate_UI`);

    html2canvas(certificate, { useCORS: true, allowTaint: true }).then(
      (canvas) => {
        canvas.toBlob(
          function (blob) {
            const imgData = URL.createObjectURL(blob);

            var pdf = new jsPDF({
              orientation: "landscape",
            });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(
              imgData,
              "JPEG",
              0,
              0,
              pdfWidth,
              pdfHeight,
              "",
              "FAST"
            );
            pdf.save(`${serialNumber}.pdf`);
            setDownload(false);
          },
          "image/jpeg",
          1.0
        );
      }
    );
  };

  const donationWithoutBlockchainHandler = async () => {
    if (
      parseFloat(donationAmount) <=
      parseFloat(auth?.userData[selectedBlockChain.databaseKey])
    ) {
      setIsloading(true);
      try {
        const res = await axios.post(
          Apiconfigs.donation,
          {
            amount: donationAmount,
            userId: userData._id,
            coinName: selectedBlockChain.name,
            message: donationMessage,
          },
          {
            headers: {
              token: window.localStorage.getItem("token"),
            },
          }
        );

        toast.success(res.data.responseMessage);
        setIsloading(false);
        if (res.data.statusCode === 200) {
          setSerialNumber(res.data.result);
          setOpenCertificate(true);
        }
        setTimeout(() => { }, 100);
        auth.updateUserData();
      } catch (error) {
        setIsloading(false);
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
        console.log("Error", error);
      }
    } else {
      toast.error(`Your ${selectedBlockChain.name} balance is insufficient.`);
    }
  };
  return (
    <Box>
      <Dialog
        open={isopenDonate}
        fullWidth="sm"
        maxWidth="sm"
        onClose={() => setIsopenDonate(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={isLoading}
        disableEscapeKeyDown={isLoading}
        className={classes.dialogParent}
      >
        <DialogContent className={classes.dialogContainer}>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h4"
              align="center"
              style={{ color: "#792034", margiBottom: "10px" }}
            >
              {userData.name}
            </Typography>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <label style={{ color: "#636262!important" }}>
                    {t('users.donationAmount')}
                  </label>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="standard-basic"
                    placeholder="30"
                    className={classes.input_fild2}
                    type="number"
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <label style={{ color: "#636262!important" }} >
                    {t("users.selectBlockchain")}
                  </label>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Select
                    fullWidth
                    // value={selectedBlockChain}
                    defaultValue="select"
                    onChange={(e) => {
                      if (e.target.value === "BNB") {
                        auth.updateSupportedNetwork(BNB_NETWORK);
                      } else {
                        auth.updateSupportedNetwork(ACTIVE_NETWORK);
                      }
                      setSelectedBlockChain(e.target.value);
                    }}
                  >
                    <MenuItem value={"select"}>Select</MenuItem>
                    {networkList.map((data, i) => {
                      return <MenuItem value={data} key={i}>{data.name}</MenuItem>;
                    })}
                  </Select>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <label style={{ color: "#636262!important" }}>
                    {t("users.donationMessage")}
                  </label>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    multiline
                    maxRows={3}
                    className={classes.input_fild2}
                    type="text"
                    onChange={(e) => setDonationMessage(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
            {auth?.userData.userType === "User" && (
              <Box>
                {selectedBlockChain !== "select" &&
                  selectedBlockChain.chainId != chainId && (
                    <Typography style={{ color: "red" }}>
                      {t("users.pleaseSwitchTo")}
                      {selectedBlockChain.networkName}
                    </Typography>
                  )}
              </Box>
            )}
            <Box mt={4}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primery"
                    className={classes.btn}
                    onClick={() => handleClose()}
                    disabled={isLoading}
                  >
                    {t("users.cancel")}
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.btn}
                    disabled={
                      isLoading ||
                      selectedBlockChain === "select" ||
                      (auth?.userData.userType === "User" &&
                        selectedBlockChain.chainId != chainId)
                    }
                    onClick={donationWithoutBlockchainHandler}
                  >
                    {t("users.transferFunds")}
                    {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {openCertificate && serialNumber && (
        <Dialog
          open={openCertificate}
          fullWidth="md"
          maxWidth="md"
          onClose={() => {
            setOpenCertificate(false);
            handleClose();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box id="certificate_UI">
            <DialogContent className={classes.certificate}>
              {/* <img src='images/img.png' className={classes.certificateimg} /> */}
              <Box className={classes.certificateBox}>
                <img src="images/Component.png" className={classes.centerImg} />
                <Box className={classes.heding}>
                  <img src="images/icon.png" />
                  <Typography variant="h6">
                    {" "}
                    C E R T I F I C A T E O F D O N A T I O N
                  </Typography>
                  <img src="images/icon.png" />
                </Box>
                <Box className={classes.body} align="center" mt={3}>
                  <Typography variant="h5">This is to certify that</Typography>
                  <Typography variant="h2">
                    {auth?.userData?.name
                      ? auth?.userData?.name
                      : sortAddress(
                        auth?.userData?.walletAddress
                          ? auth?.userData?.walletAddress
                          : auth?.userData?.ethAccount?.address
                      )}
                  </Typography>
                  <Typography variant="h5">
                    {` (${auth?.userData?.walletAddress
                      ? auth?.userData?.walletAddress
                      : auth?.userData?.ethAccount?.address
                      })`}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {t("users.hasDonated")}{" "}
                    <Typography variant="h2">
                      {donationAmount + ` `}&nbsp;
                    </Typography>{" "}
                    {" " + selectedBlockChain.name}{" "}
                    {/* <img src='images/centerimg.png' />  */} to{" "}
                  </Typography>
                  <Typography variant="h2">
                    {userData?.name
                      ? userData.name
                      : userData?.ethAccount?.address
                        ? sortAddress(userData?.ethAccount.address)
                        : sortAddress(userData?.walletAddress)}
                  </Typography>
                  <Typography variant="h5">
                    {`(${userData?.ethAccount?.address
                      ? userData?.ethAccount?.address
                      : userData?.walletAddress
                      })`}
                  </Typography>
                  <Typography variant="h5">
                    {donationMessage ? donationMessage : ""}
                  </Typography>
                </Box>
                <Box className={classes.footer}>
                  <Grid
                    container
                    spacing={2}
                    style={{ alignItems: "flex-end" }}
                  >
                    <Grid item xs={3} align="left">
                      <Typography variant="h5" style={{ color: "#d15b5b" }}>
                        {CEO_NAME}
                      </Typography>
                      <Typography variant="body2">MAS founder & CEO</Typography>
                    </Grid>
                    <Grid item xs={6} align="center">
                      {" "}
                      <span>
                        {" "}
                        {t("users.thisCertificate")}
                      </span>
                    </Grid>
                    <Grid item xs={3} align="right">
                      <Typography variant="h5">{t("users.donationId")}</Typography>
                      <Typography variant="body2" component="label">
                        {serialNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </DialogContent>
          </Box>
          <Box
            mt={2}
            pb={4}
            style={{ width: "100%", maxWidth: "200px", margin: "0 auto" }}
          >
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className="btnWidth btn-block btnHight"
              onClick={donloadBadge}
              disabled={download}
            >
              {t("users.downlaod")} <FiDownload /> {download && <ButtonCircularProgress />}
            </Button>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

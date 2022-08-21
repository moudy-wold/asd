import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Badge,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Input,
  Grid,
} from "@material-ui/core";
import { UserContext } from "src/context/User";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import moment from "moment";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { nFormatter } from "src/utils";
import { saveAs } from "file-saver";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  token: {
    textAlign: "center",
    padding: "20px 0",
    "& p": {
      fontSize: "14px",
      fontWeight: "500",
      lineHight: "20px",
      color: "#000",
    },
    "& img": {
      marginTop: "5px",
    },
  },
  // feedBox: {
  //   border: "solid 0.5px #e5e3dd",
  //   boxShadow: "0px 1px 6px #0000000d",
  //   transform: "translate(2%, -2%)",
  //   fontFamily: 'adobe-clean", sans-serif',
  //   padding: "20px",
  //   borderRadius: "15px",

  //   marginLeft: "-10%",
  //   // position: "relative",
  //   "& p": {
  //     fontSize: "14px",
  //     marginTop: "15px",
  //   },
  // },
  cards: {
    padding: "10px",
    borderRadius: "10px",
    margin: "0 10px",
    position: "relative",
    background: "#753196b0",
    margin: "8px",
    width: "90%",
    transition: "all 0.4s ease-in-out 0s",
    "&:hover": {
      transform: "scale(1.03)",
      background: "#753196f5",
    },
  },
  feedpost: {
    marginTop: "8px",
    display: "flex",
    flexWrap: "wrap",
    "&>div": {
      height: "auto!important",
    },
  },
  imageClass: {
    width: "100%",
    height: "300px",
    "@media(max-width:768px)": {
      width: "100%",
    },
  },
  LikeBox: {
    fontSize: "20px",
    cursor: "pointer",
  },
  feedmenu: {
    fontSize: "20px",
    color: "#707070",
    position: "absolute",
    right: "10px",
    top: "10px",
  },
  blurBox: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: "9",
    display: "flex",
    justifyContent: " center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
    color: " #141518",
    backgroundColor: "#ffffff80",
    "& span": {
      color: "#f26a6a",
    },
  },
  img: {
    width: "30px",
    height: "30px",
    marginLeft: "5px",

  },
  downloadButton: {
    maxWidth: "100px",
    borderRadius: "33px",
    color: "white",
    margin: "8px 5px",
    transition: "all .1s linear",
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    "&:hover": {
      background: "linear-gradient(270deg, #ffd800, #cc00ff)!important",
    },
  },
  subscribeBtn: {
    maxWidth: "145px",
    borderRadius: "33px",
    color: "white",
    padding: "8px 12px",
    margin: "8px 5px",
    transition: "all .1s linear",
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    "&:hover": {
      background: "linear-gradient(270deg, #ffd800, #cc00ff)!important",
    },
  },
  responseMessage: {
    color: "#fff",
    fontWeight: "500",
    // margin: "auto 17% auto 17%",
    width: "120px",
    display: "inline-block",
    textAlign: "center",
  },
  nftImg: {
    width: "100%",
    // height: "165px",
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
    maxHeight: "350px",
  },
  chekckLogoSince: {
    display: "flex",
  },
}));

export default function UsersCard({ data, index, updateList, allFeed }) {
  const responseMessage = allFeed?.private?.responseMessage;
  const [open3, setOpen3] = React.useState(false);
  const history = useHistory();
  const auth = useContext(UserContext);
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  const updateDimensions = () => {
    if (data?._id) {
      let offsetWidth = document.getElementById(
        "imagecard" + data?._id
      ).offsetWidth;
      let newoofsetWidth = offsetWidth - 60;
      document.getElementById("imagecard" + data?._id).style.height =
        newoofsetWidth + "px";
    }
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  // const isVideo = data.mediaUrl.includes(".mp4");
  const isVideo = (".mp4");
  const [isLoading, setIsloading] = useState(false);
  const userId =
    typeof data.userId === "object" &&
      !Array.isArray(data.userId) &&
      data.userId !== null
      ? data.userId._id
      : data.userId;
  let isUserSubscribed = false;

  const subscribeNowHandler = async (isCheck) => {
    setIsloading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.subscribeNow + data.nftId[0]._id,
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {
          auth.updateUserData();
          history.push("/profile");
          toast.success("You have subscribed successfully");
          setOpen3(false);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err.message);
        toast.error("Something went wrong");
      });
    // } else {
    //   toast.error("Balance is low");
    //   setIsloading(false);
    // }
  };
  return (
    <>
      <Box style={{ position: "relative" }}>
        <Box className={classes.cards}>
          <Box className={classes.feedBox}>
            {/* Start  UserImg And Check Logo And Since*/}
            <Box display="flex" alignItems="center">
              {/* Start User Profile */}
              <figure className="chatuser chatuser3 ">
                <img
                  src={
                    data && data.userId && data.userId.profilePic
                      ? data.userId.profilePic
                      : "images/user-profile.png"
                  }
                  alt=""
                />
              </figure>
              {/* End User Profile */}

              {/* Satrt  Check Logo And Since And */}
              <div className={classes.chekckLogoSince}>
                {" "}
                {/* Start UserName And Check Logo */}
                <Typography
                  variant="h6"
                  style={{ marginBottom: "0", fontWeight: 500, marginLeft: "5px", marginRight: "5px", }}
                >
                  {data.userId.name}
                  <img src="images/blue-check.png" className={classes.img} />
                </Typography>
                {/* End UserName And Check Logo */}

                {/* Start Since */}
                <Typography variant="body" component="small" style={{ width: "fit-content", padding: "10px", color: "#fff" }}>
                  {t("bundles.since")} {moment(data.createdAt).format("DD-MM-YYYY HH:mm")}
                </Typography>
                {/* End Since */}

              </div>
            </Box>{" "}
            {/* End  UserImg And Check Logo And Since*/}

            {/* Start Bundle`s Name Title Details */}
            <Box style={{ padding: "10px 5px" }}>
              {/* Start Bundle Name */}
              <Typography
                variant="h6"
                style={{
                  marginBottom: "10px",
                  fontWeight: 500,
                  width: "fit-content",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {data?.nftId[0]?.bundleName}
              </Typography>
              {/* End Bundle Name */}

              {/* Start Bundle Title */}
              <Typography
                variant="h6"
                style={{ marginBottom: "-10px", fontWeight: 500 }}
              >
                {data?.title}
              </Typography>
              {/* End Bundle Title */}

              {/* Start Bundle Details */}
              <Typography
                variant="body1"
                component="p"
                style={{
                  marginBottom: "10px",
                  fontWeight: 500,
                  width: "fit-content",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {data?.details}
              </Typography>
              {/* End Bundle Details */}
            </Box>
            {/* End Bundle`s Name Title Details */}

            {/* Start Vider Or Img */}
            <Box className={classes.feedpost}>
              {/* Start Vedio */}
              {isVideo ? (
                <Box updateList style={{ width: "100%" }}>
                  <video controls style={{ width: "100%", height: "300px" }}>
                    <source src={data?.mediaUrl} type="video/mp4" />
                  </video>
                  <Box stye={{ display: "flex", justifyContent: "space-between" }}>
                    <Button className={classes.downloadButton} fullWidth>
                      {t("bundles.download")}
                    </Button>
                    {/* Start SubscrbeNow And ResponseMessage */}
                    <Typography className={classes.responseMessage}>
                      {responseMessage}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => setOpen3(true)}
                      className={classes.subscribeBtn}
                    >
                      {t("bundles.subscribeNow")}
                    </Button>
                  </Box>
                  {/* End SubscrbeNow And ResponseMessage */}
                </Box>
                // End Vedio
              ) : (
                // <img className={classes.imageClass} src={data?.mediaUrl} />

                // Start Img 
                <Box
                  id={`imagecard${data._id}`}
                  className={classes.nftImg}
                  style={{
                    background: "url(" + data?.mediaUrl + ")",
                  }}
                // onClick={() => {
                //   history.push("/nft");
                // }}
                ></Box>
                //End Img 
              )}
            </Box>
            {/* End Vider Or Img */}

            {/* Start Likes Contaniner */}
            <Box>
              <IconButton>
                <FaHeart
                  style={{ color: "#FFF" }}
                // style={isLike ? { color: "red" } : { color: "#FFF" }}
                // onClick={() => likeDislikeFeedHandler(data._id)}
                />
              </IconButton>
              &nbsp;
              <Badge
              // badgeContent={nFormatter(parseFloat(data.likesCount), 1)}
              ></Badge>{" "}
              &nbsp;<span>{t("bundles.likes")}</span>
            </Box>
          </Box>
        </Box>

      </Box>

      {open3 && (
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={open3}
          onClose={() => setOpen3(false)}
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick={isLoading}
          disableEscapeKeyDown={isLoading}
        >
          <DialogContent>
            <Box className={classes.PhotoBox}>
              {isVideo ? (
                <div>
                  <video width="100%" controls>
                    <source src={data?.nftId[0]?.mediaUrl} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <img
                  src={data?.nftId[0]?.mediaUrl}
                  alt=""
                  style={{ height: "368px", width: "553px" }}
                />
              )}
              {/* <img src={data.mediaUrl} alt="" /> */}
            </Box>
            <Box mt={3} className={classes.bundleText} textAlign="center">
              <Typography variant="h4" className="red">
                {data?.nftId[0]?.bundleName}
              </Typography>
            </Box>

            <Box mt={2} className={classes.deskiText}>
              <Typography variant="h4" align="left" color="textSecondary">
                {t("bundles.donationAmount")}{" "}
                <span>
                  {data?.nftId[0]?.donationAmount} {data.coinName}
                </span>
              </Typography>
              <Typography variant="h4" align="left" color="textSecondary">
                {t("bundles.duration")} <span> {data?.nftId[0]?.duration}</span>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} lg={2}>
                  <Typography variant="h4" align="left" color="textSecondary">
                    {t("bundles.details")}{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9} lg={10}>
                  <Typography
                    variant="body2"
                    align="left"
                    color="textSecondary"
                  >
                    {data?.nftId[0]?.bundleTitle}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id !== data.userId && (
                <Box mt={3} mb={3} textAlign="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => {
                      setOpen3(false);
                    }}
                    disabled={isLoading}
                  >
                    {t("bundles.cancel")}
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
                      // disabled={isLoading}
                      >
                        {t("bundles.subscribeNow")}
                        {/* {isLoading ? "pending..." : "Subscribe now"}{" "}
                        {isLoading && <ButtonCircularProgress />} */}
                      </Button>
                    )}
                </Box>
              )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

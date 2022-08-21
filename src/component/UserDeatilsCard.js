import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, makeStyles, Button, Grid } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
import { FaHeart } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({

  cards: {
    // background: "url(" + userCardData.profilePic + ")",
    // background: "url('./images/my-photo.jpg')",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    height: "54vh",
    // minWidth:"20px",
    position: "relative",
    borderRadius: "15px",
    transition: ".2s",
    margin: "13px 13px",
    "&:hover": {
      transform: "scale(1.02)",
    },


  },
  header: {
    backgroundColor: "transparent",

  },
  contantCard: {
    // overflow: "hidden",
    textAlign: "center",
    height: "100%",
    position: "relative",

    "&>div": {
      height: "100%",
    },
    "@media(max-width:821px)": {
      fontSize: "11px !important",
    },


  },
  nftImg: {
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
  cardFooter: {
    userSelect: "none",
    position: "absolute",
    bottom: "0px",
    height: "45%!important",
    left: "5%",
    opacity: "0.8",
    transition: "all .2s linear",
    // background: "#2f1385",
    background: "#631b87",
    gap: "10px",
    padding: "5px",
    width: "90%",
    zIndex: 10,
    boxShadow: "0px 5px 18px #2f1385",
    borderRadius: "15px",
    marginBottom: "10px",
    "&:hover": {
      opacity: "1",
    },
    "@media(max-width:567px)": {
      height: "48%!important",
    },
  },
  iconParent: {
    width: "8%",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: ".2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  socialbox: {
    color: "#FFF",
    cursor: "pointer",
    fontSize: "25px",
    "@media(max-width:821px)": {
      height: "12px",
      marginBottom: "3px",
    },

  },
  chatbox: {
    color: "#FFF",
    cursor: "pointer",
    fontSize: "25px",
    "@media(max-width:821px)": {
      height: "12px",
      marginBottom: "3px",
    },
  },

  userBtn: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    backgroundColor: "inherit",
    borderRadius: "16px",
    cursor: "pointer",
    outline: "0",
    padding: "0.5rem",
    position: "relative",
    transition: "all .3s ease-in-out !important",
    maxWidth: "86%",
    border: "1px solid #9821b7",
    margin: "auto !important",
    textAlign: "center",
    display: "block !important",
    "&:hover": {
      // background: "linear-gradient(0.25turn, #6f079f, #fc975b,#1b0d6a)",
      background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
      transform: "scale(1.3)",
      width: "86%",
    },
    "& span": {
      color: "#FFF !important",
      transition: ".2s !important",
      fontSize: "16px",
      maxWidth: "90%",
      margin: "auto",
      inlineSize: "160px",
      overflow: "hidden",
    },
    "&:hover span": {
      margin: "0",
      overflow: "visible",
      fontSize: "normal",
      maxWidth: "100%",
      inlineSize: "auto",
    },
  },
}));

export default function UserDeatilsCard({ data, index, isdonor, callbackFn }) {
  const [t, i18n] = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const userCardData = isdonor ? data.history : data;
  let isLike = false;
  const user = useContext(UserContext);
  const likeDislikeUserHandler = async (id) => {
    if (user.userData?._id) {
      if (user.userData?._id !== userCardData._id) {
        try {
          const res = await axios.get(Apiconfigs.likeDislikeUser + id, {
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
        } catch (error) { }
      } else {
        toast.error("You can not like yourself");
      }
    } else {
      toast.error("Please Login");
    }
  };

  if (user.userData?._id && userCardData) {
    const likeUser = userCardData?.likesUsers?.filter(
      (data) => data === user.userData._id
    );
    isLike = likeUser?.length > 0;
  }

  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecardd" + data?._id
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 60;
    document.getElementById("imagecardd" + data?._id).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Grid item x={12} className={classes.cards} >
      {userCardData && (
        <Box className={classes.contantCard} >
          {/* Start img */}
          <Box className={classes.nftimg}>
            {userCardData.profilePic ? (
              <Box
                id={`imagecardd${data?._id}`}
                className={classes.nftImg}
                style={{
                  background: "url(" + userCardData.profilePic + ")",
                }}
              ></Box>
            ) : (
              <Box
                id={`imagecardd${data?._id}`}
                className={classes.nftImg}
                style={{
                  background: "url(" + "./images/my-photo.jpg" + ")",
                }}
              ></Box>
            )}

            {/* <img
            src={
              userCardData.profilePic
                ? userCardData.profilePic
                : "images/user-profile.png"
            }
            alt=""
          /> */}
          </Box>
          {/* End Img */}

          {/* Start Footer */}
          <Box className={classes.cardFooter}>
            {/* Parent Of Chat And Name And Like */}
            <Box style={{ display: "flex", alignItems: "center", margin: "12px auto" }}>
              {/* Start Like */}
              <Box className={classes.iconParent} style={{ marginRight: "5px" }}>
                <FaHeart
                  style={isLike ? { color: "red" } : {}}
                  onClick={() => likeDislikeUserHandler(userCardData._id)}
                  className={classes.socialbox}
                />
              </Box>
              {/* End Like */}

              {/* Start Name */}
              <Button
                onClick={() => {
                  history.push({
                    pathname: "/user-profile",
                    search: userCardData.userName,
                  });
                }}
                variant="h6"
                component="h6"
                className={classes.userBtn}
                style={{ color: "#FFF !important" }}
              >
                {userCardData && userCardData.name
                  ? userCardData.name
                  : userCardData.userName}
              </Button>
              {/* End Name */}

              {/* Start Chat */}
              <Box className={classes.iconParent} style={{ marginLeft: "5px" }}>
                <BsChat
                  onClick={() => {
                    if (user.userData?._id) {
                      if (user.userData?._id !== data?._id) {
                        history.push({
                          pathname: "/chat",
                          search: userCardData.ethAccount
                            ? userCardData.ethAccount.address
                            : userCardData.walletAddress,
                        });
                      } else {
                        toast.error("You can not chat yourself");
                      }
                    } else {
                      toast.error("Please login");
                    }
                  }}
                  className={classes.chatbox}
                />
              </Box>
              {/* End Chat */}

            </Box>
            {/* End Parent Of Chat And Name And Like */}

            {/* Start MAS */}
            <Typography
              variant="h6"
              component="h6"
              style={{ color: "#fff", fontWeight: "400", textAlign: "center", fontSize: "14px", marign: "10px auto" }}
            >
              <span style={{ color: "#fff" }}>{t("creators.specialty")} Front End</span>
              {/* {userCardData.totalEarning} */}
              {" "}
            </Typography>
            {/* End MAS */}
            {/* Start subScribe */}
            <Typography
              variant="h6"
              component="h6"
              style={{ color: "#FFF", fontWeight: "400", textAlign: "center", fontSize: "16px", margin: "10px auto", }}
            >
              <span style={{ color: "#FFF" }}>{t("creators.numberOfSubscribe")} 12 </span>{" "}
              {/* {userCardData.profileSubscriberCount} */}
            </Typography>
            {/* End subScribe */}
          </Box>
          {/* End Footer */}

          {isdonor && (
            <Typography
              variant="h6"
              component="h6"
              style={{ color: "#000", fontWeight: "400" }}
            >
              <span style={{ color: "#5a4e4e" }}>{t("creators.donationAmount")}</span>{" "}
              {data.amount}
              {data && data.coinName ? data.coinName : "mas"}
            </Typography>
          )}
        </Box>
      )}
    </Grid>
  )
}

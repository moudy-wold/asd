import React, { useContext, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Badge,
  IconButton,
  Button,
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

  },
  downloadButton: {
    maxWidth: "100px",
    borderRadius: "33px",
    color: "white",
    margin: "8px 5px",
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    "&:hover": {
      background: "linear-gradient(270deg, #ffd800, #cc00ff)!important",
    },
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
  },
  chekckLogoSince: {
    display: "flex",
  },
}));

export default function UsersCard({ data, index, updateList }) {
  const history = useHistory();
  const auth = useContext(UserContext);
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  let isLike = false;

  const likeDislikeFeedHandler = async () => {
    axios({
      methods: "GET",
      url: Apiconfigs.likeDislikeFeed + data._id,
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          if (updateList) {
            updateList();
          }
        } else {
          toast.error(res.data.responseMessage);
        }
      })
      .catch((res) => {
        console.log(res.message);
      });
  };

  const isVideo = data.mediaUrl.includes(".mp4");
  if (auth?.userData?._id) {
    const likeUser = data.likesUsers.filter(
      (data) => data === auth.userData._id
    );
    isLike = likeUser.length > 0;
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
  return (
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

          {/* Satrt UserName And Check Logo And Since And */}
          <div className={classes.chekckLogoSince}>
            {" "}
            {/* Start Check Logo */}
            <Typography
              style={{
                width: "50px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                padding: "8px 10px",
                height: "50px",
              }}
            >
              {data?.userId?.name}
              <img src="images/blue-check.png" className={classes.img} />
            </Typography>
            {/* End UserName And Check Logo */}

            &nbsp;
            {/* Start Since */}
            <Typography variant="body" component="small" style={{ width: "fit-content", padding: "10px", color: "#fff" }}>
              Since {moment(data.createdAt).format("DD-MM-YYYY HH:mm")}
            </Typography>
            {/* End Since */}

          </div>
          {/* End Check Logo And Since And */}

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
            style={{
              marginBottom: "10px",
              fontWeight: 500,
              width: "fit-content",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data.title}
          </Typography>
          {/* End Bundle Title */}

          {/* Start Bundle Details */}
          <Typography
            variant="body1"
            component="p"
            style={{
              fontWeight: 400,
              fontSize: "13px",
              color: "#fff",
              width: "auto",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            dangerouslySetInnerHTML={{
              __html: data.details,
            }}
          ></Typography>
          {/* End Bundle Details */}
        </Box>
        {/* End Bundle`s Name Title Details */}

        {/* Start Vider Or Img */}
        <Box className={classes.feedpost}>
          {/* Start Vedio */}
          {isVideo ? (
            <Box id={`imagecard${data._id}`} className={classes.asdfsaf} style={{ height: "auto!important" }}>
              <video controls style={{ width: "100%" }}>
                <source src={data.mediaUrl} type="video/mp4" />
              </video>
              <Button
                className={classes.downloadButton}
                fullWidth
                onClick={downLoadFile}
              >
                {t("bundles.download")}
              </Button>
            </Box>
            // End Vedio
          ) : (
            // <img
            //   className={classes.imageClass}
            //   src={data?.mediaUrl ? data.mediaUrl : "images/feed1.png"}
            // />
            // Start Img 
            <Box
              id={`imagecard${data._id}`}
              className={classes.nftImg}
              style={{
                background: "url(" + data.mediaUrl + ")",
              }}
            // onClick={() => {
            //   history.push('/nft')
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
              style={isLike ? { color: "#d15b5b" } : { color: "#FFF" }}
              onClick={() => likeDislikeFeedHandler(data._id)}
            />
          </IconButton>
          &nbsp;
          <Badge
            badgeContent={nFormatter(parseFloat(data.likesCount), 1)}
          ></Badge>{" "}
          &nbsp;<span>Likes</span>
        </Box>
        {/* End Likes Contaniner */}
      </Box>
    </Box>
  );
}

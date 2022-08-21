import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Input,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FiMoreHorizontal } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { FiDownload } from "react-icons/fi";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  cards: {
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    height: "54vh",
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
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "500",
    color: "#fff",
    marginBottom: "20px",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
  },
  contantCard: {
    textAlign: "left",
    position: "relative",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    "& h6": {
      marginBottom: "2px !important",
      fontSize: "18px !important",
      [theme.breakpoints.down("md")]: {
        fontSize: "10px !important",
      },
      "& span": {
        color: "#fff",
        paddingLeft: "5px",
      },
      "@media(max-width:821px)": {
        fontSize: "11px !important",
      },
    },
    "& p": {
      fontSize: "12px",
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
    color: "#fff",
    alignItems: "center",
    paddingBottom: "10px",
    position: "relative",
    "&::after": {
      content: "''",
      height: " 1px",
      width: "70%",
      position: "absolute",
      backgroundColor: "#cccc",
      bottom: "6px",
      maxWidth: "100%",
      left: "50%",
      transform: " translateX(-50%)",
    },
  },
  feedmenu: {
    fontSize: "20px",
    color: "#fff",
    width: "25%",
    zIndex: "9",
    padding: "0",
    paddingRight: "4px",
    textAlign: "right",
    "& span": {
      display: "inline",
    },
  },
  donation: {
    "& span": {
      fontSize: "12px",
      padding: "2px 5px",
      border: "1px solid #ccc",
      cursor: "pointer",
      "&.active": {
        backgroundColor: "#ccc",
      },
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
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
    "& img": {
      maxWidth: "100%",
      borderRadius: "15px",
      width: "-webkit-fill-available",
    },
  },
  bundleText: {
    "& .red": {
      color: "#792034",
    },
    "& h4": {
      color: "#fff",
      fontSize: "20px",
    },
  },
  deskiText: {
    "& h4": {
      marginBottom: "10px",
      color: "#fff",
      fontSize: "20px",
      "& span": {
        color: "#fff",
      },
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  input_fild: {
    backgroundColor: "#ffffff6e",
    borderRadius: "5.5px",
    border: " solid 0.5px #e5e3dd",
    color: "#fff",
    width: "100%",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "& .MuiInputBase-input": {
      color: "#fff",
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
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    "& video": {
      height: "100%",
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
  cardFooter: {
    userSelect: "none",
    flex: "1",
    height: "25vh!important",
    margin: "auto",
    opacity: "0.6",
    transition: "all .2s linear",
    background: "#2f1385b8",
    gap: "10px",
    padding: "5px",
    paddingTop: "10px",
    width: "100%",
    zIndex: 10,
    borderRadius: "0 0 15px 15px",
    marginBottom: "10px",
    "&:hover": {
      opacity: "0.8",
    },
    "@media(max-width:990px)": {
      height: "15vh!important",
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

export default function UsersCard({
  data,
  index,
  fun,
  setfire,
  isDays,
  updateList,
}) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const more = useRef(null);
  const [t, i18n] = useTranslation();
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [anchorEl, setAnchorEl] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [duration, setDuration] = useState(data.duration);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setMoreOpen(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);

  const handleClickOpen1 = () => {
    setMoreOpen(false);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const [open2, setOpen2] = useState(false);

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open3, setOpen3] = useState(false);

  const handleClose3 = () => {
    setOpen3(false);
  };

  const [open5, setOpen5] = useState(false);

  const handleClickOpen5 = () => {
    setAnchorEl(null);
    setOpen5(true);
  };

  const handleClose5 = () => {
    setOpen5(false);
  };
  const [input, setInput] = useState(data.donationAmount);
  const [image, setImage] = useState(
    data ? data.mediaUrl : "images/user-profile.png"
  );
  const [date, setDate] = useState(data.duration);
  const [userImg, setUserImg] = useState(data.mediaUrl);

  const del = async () => {
    axios({
      method: "delete",
      url: Apiconfigs.del,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      params: {
        _id: data._id,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (updateList) {
            updateList();
          }
          toast.success(res.data.responseMessage);
          setOpen2(false);
          setOpen(false);
        } else {
          toast.error(res.data.responseMessage);
        }
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response) {
          toast.error(err.response.data.responseMessage);
        } else {
          toast.error(err.message);
        }
        setOpen2(false);
        setOpen(false);
      });
  };

  const edit = async () => {
    if (input === "") {
      toast.error("Please enter some valid amount");

      return;
    }
    if (date === "") {
      toast.error("Please enter a valid date and time");
      return;
    }
    if (!userImg) {
      toast.error("set image");
      return;
    }
    const formData = new FormData();
    formData.append("file", userImg);
    console.log("form", formData);
    await axios({
      method: "PUT",
      url: Apiconfigs.edit,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: {
        _id: data._id,
        donationAmount: input,
        duration: duration,
        mediaUrl: userImg,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (updateList) {
            updateList();
          }
          toast.success("Done");
          setOpen2(false);
          setOpen(false);
          setfire(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const subscribe = async () => {
    if (
      parseFloat(data.donationAmount) < parseFloat(user.userData.massBalance)
    ) {
      await axios({
        method: "GET",
        url: Apiconfigs.subscribeNow + data._id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            if (updateList) {
              updateList();
            }
            toast.success("Done");
          } else {
            toast.error("Error");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert("Balance is low");
    }
  };

  const isVideo = data.mediaUrl.includes(".mp4");
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

      {/* Start Title And Option */}
      <Box display="flex">

        {/* Start Title */}
        <Typography
          variant="h6"
          className="textOverflow"
          component="h6"
          style={{
            color: "#fff",
            textAlign: "left",
            paddingLeft: "5px",
            width: "75%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {data.bundleTitle}
        </Typography>
        {/* End Title */}


        {/* Start Option */}
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() => setMoreOpen(true)}
          className={classes.feedmenu}
          ref={more}
        >
          <FiMoreHorizontal />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={more.current}
          keepMounted
          open={moreOpen}
          onClose={() => setMoreOpen(false)}
        >
          {user.userData && user.userData._id === data.userId && (
            <MenuItem onClick={handleClickOpen}>Edit</MenuItem>
          )}
          <MenuItem onClick={handleClickOpen1}>View</MenuItem>
          {/* <MenuItem onClick={handleClickOpen2}>Subscribe now</MenuItem> */}
        </Menu>
        {/* Start Option */}
      </Box>
      {/* End Title And Option */}

      {/* Start Content Card */}
      <Box className={classes.contantCard}>
        {/* Start Vedio Or Image */}
        <Box style={{ height: "25vh", borderRadius: "10px", }}>
          {isVideo ? (
            <Box
              id={`imagecard${data?._id}`}
              className={classes.nftImg}
            >
              <video width="100%" controls style={{
                cursor: "pointer",
                background: "#000",
              }}>
                <source src={data.mediaUrl} type="video/mp4" />
              </video>
            </Box>
          ) : (
            // <img src={data.mediaUrl} alt="" />
            <Box
              id={`imagecard${data?._id}`}
              className={classes.nftImg}
              style={{
                background: "url(" + data.mediaUrl + ")",
              }}
              onClick={() => {
                history.push("/nft");
              }}
            ></Box>
          )}
        </Box>
        {/* End Vedio Or Image */}

        {/* Start Card Footer */}
        <Box className={classes.cardFooter}>
          <Typography
            variant="h6"
            component="h6"
            style={{ color: "#fff", fontWeight: "400" }}
          >
            <span style={{ color: "#fff" }}>{t("bundles.donationAmount")}</span>
            {data.donationAmount} MAS
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            style={{ color: "#fff", fontWeight: "400" }}
          >
            <span style={{ color: "#fff" }}>{t("bundles.duration")} </span>
            {isDays
              ? data.duration
              : moment(data.duration).format("DD-MM-YYYY")}
            <br />  &nbsp;{moment(data.duration).format("hh:mm A")}
            {/* {data.duration} */}
            { }
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            style={{ color: "#fff", fontWeight: "400" }}
          >
            <span style={{ color: "#fff" }}>{t("bundles.numberOfSubscribers")} </span>
            {data.subscriberCount}
          </Typography>
        </Box>
        {/* End Footer Card */}

      </Box>
      {/* End Content Card */}

      {/* edit */}
      <Dialog
        open={open}
        fullWidth="sm"
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h4"
              align="center"
              style={{
                color: "#fff",
                margiBottom: "10px",
                width: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data.bundleTitle}
            </Typography>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <label>
                    {t("bundles.donationAmount")}
                  </label>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="standard-basic"
                    className={classes.input_fild2}
                    value={input}
                    type="number"
                    onChange={(e) => setInput(e.target.value)}
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
                  <label> {t("bundles.duration")} </label>
                </Grid>
                <Grid item xs={12} md={8} className={classes.donation}>
                  <span
                    className={duration === "7 Days" ? "active" : null}
                    onClick={() => setDuration("7 Days")}
                  >
                    {t("bundles.days7")}
                  </span>
                  <span
                    className={duration === "14 Days" ? "active" : null}
                    onClick={() => setDuration("14 Days")}
                  >
                    {t("bundles.days14")}
                  </span>
                  <span
                    className={duration === "30 Day" ? "active" : null}
                    onClick={() => setDuration("30 Day")}
                  >
                    {t("bundles.days30")}
                  </span>
                  <span
                    className={duration === "60 Days" ? "active" : null}
                    onClick={() => setDuration("60 Days")}
                  >
                    {t("bundles.days60")}
                  </span>
                  <span
                    className={duration === "1 Year" ? "active" : null}
                    onClick={() => setDuration("1 Year")}
                  >
                    {t("bundles.years")}
                  </span>
                </Grid>
                {/* <Grid item xs={12} md={8} className={classes.donation}>
                  <TextField
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid> */}
              </Grid>
            </Box>

            <Box align="center">
              <label>  {t("bundles.services")} </label>
              <Typography
                variant="body2"
                componant="p"
                style={{ color: "#fff", fontSize: "20px" }}
              >
                {t("bundles.iWillSend")} <br />
                {t("bundles.monthSpecially")}
              </Typography>
            </Box>
            <Box mt={2} className={classes.changepic}>
              <small>
                {t("bundles.change_UploadAPhotoOrVideo")}
                <input
                  type="file"
                  onChange={(e) => {
                    setUserImg(e.target.files[0]);
                    setImage(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </small>
              <img src={image} alt="" />
            </Box>
            <Box mt={4}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item md={4}>
                  <Link style={{ color: "#fff" }} onClick={del}>
                    {t("bundles.deleteThisBundle")}
                  </Link>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primery"
                    className="btn-block removeredius"
                    onClick={handleClose}
                  >
                    {t("bundles.cancel")}
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className="btn-block removeredius ml-10"
                    onClick={edit}
                  >
                    {t("bundles.saveChanges")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* view */}

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
              style={{
                color: "#fff",
                margiBottom: "10px",
                width: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data.bundleTitle}
            </Typography>

            <Box align="center" mt={3}>
              <Typography
                variant="h6"
                component="h6"
                style={{
                  color: "#fff",
                  fontWeight: "400",
                  width: "auto",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: "#fff" }}>{t("bundles.donationAmount")} </span>
                {data.donationAmount}
                {data && data.coinName ? data.coinName : "mas"}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#fff", fontWeight: "400" }}
              >
                <span style={{ color: "#fff" }}>{t("bundles.duration")}</span>
                {data.duration}
                {/* {moment(data.duration).format('DD-MM-YYYY hh:mm A')} */}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#fff" }}>{t("bundles.numberOfSubscribers")}</span>
                {data.subscriberCount}
              </Typography>
            </Box>

            <Box align="center">
              <label> {t("bundles.services")}</label>
              <Typography
                variant="body2"
                componant="p"
                style={{
                  color: "#fff",
                  fontSize: "20px",
                  width: "auto",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {data.details}
              </Typography>
            </Box>
            <Box mt={2} className={classes.changepic}>
              <img src={data.mediaUrl} alt="" />
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Subscribe now */}

      <Dialog
        fullWidth="sm"
        maxWidth="sm"
        open={open2}
        onClose={handleClose2}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <Box className={classes.PhotoBox}>
            <img src={data.mediaUrl} alt="" />
          </Box>
          <Box mt={3} className={classes.bundleText} textAlign="center">
            <Typography variant="h4" className="red">
              {t("bundles.bundle")} {index + 1}
            </Typography>
            <Typography variant="h4">{t("bundles.theBasicBundle")}</Typography>
          </Box>

          <Box mt={2} className={classes.deskiText}>
            <Typography variant="h4" align="left" color="textSecondary">
              {t("bundles.donationAmount")}<span>{data.donationAmount} MAS</span>
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary">
              {t("bundles.duration")} <span>{data.duration}</span>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} lg={2}>
                <Typography variant="h4" align="left" color="textSecondary">
                  {t("bundles.details")}
                </Typography>
              </Grid>
              <Grid item xs={12} md={9} lg={10}>
                <Typography
                  variant="body2"
                  align="left"
                  color="textSecondary"
                  style={{
                    width: "auto",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.details}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3} mb={3} textAlign="center">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={subscribe}
            >
              {t("bundles.subscribeNow")}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* enter amount */}

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
            <Typography variant="h4" align="center" style={{ color: "#fff" }}>
              {t("bundles.enterAnAmount")}
            </Typography>
            <Box mt={4}>
              <Input
                placeholder="300"
                className={classes.input_fild2}
                endAdornment={
                  <InputAdornment position="end">{t("bundles.selecteAToken")}</InputAdornment>
                }
              />
            </Box>

            <Box mt={4}>
              <Typography variant="h4" align="center" style={{ color: "#fff" }}>
                {t("bundles.sendAMessage")}
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
                onClick={handleClickOpen5}
              >

                {t("bundles.donateNow")}
              </Button>
            </Box>
            <small>
              {t("bundles.ETHAETHApply")}
            </small>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* certificate */}

      <Dialog
        open={open5}
        fullWidth="md"
        maxWidth="md"
        onClose={handleClose5}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.certificate}>
          <img src="images/img.png" className={classes.certificateimg} alt="" />
          <Box
            mt={2}
            mb={4}
            style={{ width: "100%", maxWidth: "200px", margin: "0 auto" }}
          >
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className="btnWidth btn-block btnHight"
              onClick={handleClickOpen1}
            >
              {t("bundles.download")} <FiDownload />
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  makeStyles,
  InputAdornment,
  FormHelperText,
  MenuItem,
  Select,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MuiAlert from "@material-ui/lab/Alert";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router";
import { AddBundlePopup } from "./Bundles";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useTranslation } from "react-i18next";
// import { Editor } from '@tinymce/tinymce-react'
const useStyles = makeStyles((theme) => ({
  main: {
    background: "#441682",
    width: "100%",
    paddingTop: "20px",
  },
  input_fild: {
    backgroundColor: "#ffffff6e",
    borderRadius: "5.5px",
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    // height: "48px",
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
      height: "34px",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
  basic: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "30px",
    paddingTop: "20px",
    color: "#fff",
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  Button: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: "25px",
  },
  ButtonBtn: {
    paddingTop: "30px",
    width: "200px",
  },
  name: {
    textAlign: "right",
    fontSize: "20px",
    paddingTop: "10px",
    color: "#5a4e4e!important",
  },
  inputbox: {
    width: "90%",
    "& input": {
      color: "#FFF",
      width: "100%",
    },
  },
  LoginBox: {
    background: "linear-gradient(270deg, #22c37f, #c100fb)!important",
    margin: "20px auto",
    paddingBottom: "20px",
    borderRadius: "15px",
  },
  UploadBox: {
    border: "solid 0.5px #707070",
    display: "flex",
    backgroundColor: "#429d98",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "110px",
    position: "relative",
    "& input": {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      opacity: "0",
    },
    "& .jodit-wysiwyg": {
      color: "FFF"
    },
  },
  input_fild22: {
    width: "90%",
    margin: "10px auto",
    "& .jodit-toolbar__box:not(:empty)": {
      backgroundColor: "#429d98",
    },
    "& .jodit-toolbar__box": {
      backgroundColor: "#429d98!important",
    },
    "& p": {
      color: "#FFF",
    },
    "& .jodit-wysiwyg": {
      backgroundColor: "#429d98",
      color: "#FFF",
    },
    "& .jodit-workplace": {
      backgroundColor: "#429d98",
      color: "#FFF",
    },
    "& .jodit-status-bar": {
      backgroundColor: "#429d98",
      color: "#FFF",
    },
  },
  selectItem: {
    "& svg": {
      color: "#ababab",
    },
  },
  btn: {
    width: "200px",
    margin: "10px 10px 10px 69%",

    borderRadius: "20px",
    textAlign: "center",
    color: "#3c504f",
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    "&:hover": {
      background: "linear-gradient(270deg, #ffd800, #cc00ff)!important",
      color: "#cdb88a"
    },
  },
  shareBtn: {
    width: "200px",
    margin: "10px",
    borderRadius: "20px",
    textAlign: "center",
    color: "#2fdf78",
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    "&:hover": {
      background: "linear-gradient(270deg, #ffd800, #cc00ff)!important",
      color: "#cdb88a"
    },
  },
  backBtn: {

    width: "200px",
    margin: "10px",
    borderRadius: "20px",
    textAlign: "center",
    color: "#754182",
    background: "#8a8383!important",
    "&:hover": {
      background: "#fff!important",
      color: "#5a4e4e"
    },
  },
  parent: {
    textAlign: 'center',
  },
}));

const currencies = [
  {
    value: "PUBLIC",
    label: "PUBLIC",
  },
  {
    value: "PRIVATE",
    label: "PRIVATE",
  },
];

export default function Login() {
  const [t, i18n] = useTranslation();
  const [openAddBundle, setOpenAddBundle] = useState(false);
  const [list, setlist] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [img, setImg] = useState("");
  const [image, setImage] = useState("");
  const [loader, setloader] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [activities, setActivities] = useState("");
  const [bundles, setBundles] = useState([]);
  const editor = useRef(null);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/{
  };
  const submitHandler = async () => {
    setIsSubmit(true);
    if (
      img !== "" &&
      title !== "" &&
      details !== "" &&
      list.length > 0 &&
      activities !== ""
    ) {
      const formData = new FormData();
      formData.append("mediaUrl", img);
      formData.append("title", title);
      formData.append("details", details);
      formData.append("postType", activities);
      formData.append("nftIds", JSON.stringify(list));
      setIsSubmit(false);
      // console.log(formData)
      setloader(true);
      axios({
        method: "Post",
        url: Apiconfigs.share,
        headers: {
          token: window.localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: formData,
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            toast.success(res.data.responseMessage);
            setloader(false);
            history.push("/profile");
          } else {
            toast.error(res.data.responseMessage);
            setloader(false);
          }
        })
        .catch((err) => {
          toast.error(err.message);
          setloader(false);
        });
    }
  };

  const bundle = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.bundleList,
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setBundles(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    bundle();
  }, []);

  const updateSelectedBundle = (data) => {
    const status = list.includes(data);
    if (status) {
      const index = list.indexOf(data);
      if (index > -1) {
        list.splice(index, 1);
        setlist(list);
      }
    } else {
      setlist([...list, data]);
    }
  };

  return (
    <Grid className={classes.main}>
      <Grid item xs={12} sm={9} md={6} className={classes.LoginBox}>
        <Container maxWidth="xl">
          <Typography variant="h4" className={classes.basic}>
            {t("profile.shareWithAudience")}
          </Typography>
          <Box className>
            <Box mt={5}>
              <Grid container spacing={1}>
                {" "}
                <Grid item xs={12} className={classes.parent}>
                  <label className={classes.name}>{t("profile.title")}</label>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    placeholder=""
                    className={classes.inputbox}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={isSubmit && title === ""}
                    helperText={
                      isSubmit && title === "" && "Please enter valid title"
                    }
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <label className={classes.name}> {t("profile.details")} </label>
                  <JoditEditor
                    className={classes.input_fild22}
                    ref={editor}
                    value={details}
                    config={config}
                    tabIndex={8} // tabIndex of textarea
                    onBlur={(newContent) => {
                      // const temp = { ...details, newContent }
                      setDetails(newContent);
                    }} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {

                      // const temp = { ...details, newContent }
                      // setdetails(temp)
                    }}
                  />
                  {/* <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  focused="true"
                  multiline
                  rows={4}
                  variant="outlined"
                  // className={classes.inputbox}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  error={isSubmit && details === ''}
                  helperText={
                    isSubmit && details === '' && 'Please enter valid details'
                  }
                /> */}
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12} >
                  <label className={classes.name}>  {t("profile.uploadAPH_VI")}  </label>
                  <Box className={classes.UploadBox}>
                    <label htmlFor="raised-button-file">
                      <input
                        accept="image/*,video/mp4"
                        style={{ display: "none" }}
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        onChange={(e) => {
                          setImg(e.target.files[0]);
                          setImage(URL.createObjectURL(e.target.files[0]));
                        }}
                        type="file"
                      />
                      {image ? (
                        <>
                          <img src={image} alt="" width="200px" />
                          <Box textAlign="center">
                            <Button
                              color="primary"
                              size="large"
                              variant="contained"
                              onClick={() => {
                                setImg("");
                                setImage("");
                              }}
                            >
                              {t("profile.remove")}
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="outined"
                            color="primary"
                            component="span"
                          >
                            {t("profile.uploadAPH_VI")}&nbsp;
                            <CloudUploadIcon />
                          </Button>
                        </label>
                      )}
                    </label>
                  </Box>
                  {isSubmit && image === "" && (
                    <FormHelperText error>  {t("profile.pleaseSelecteImg")}</FormHelperText>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} >
                  <label className={classes.name}>{t("profile.selectType")} </label>
                  <Box>
                    <Select
                      fullWidth
                      value={activities}
                      className={classes.selectItem}
                      // defaultValue="select"
                      onChange={(e) => setActivities(e.target.value)}
                      error={isSubmit && activities === ""}
                      helperText={
                        isSubmit && activities === "" && "Please select post type"
                      }
                    >
                      {currencies.map((data, i) => {
                        return (
                          <MenuItem key={data.value} value={data.value}>
                            {data.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <label className={classes.name}>
                    {t("profile.selectShare")}{" "}
                  </label>
                  <Box className="box-select" style={{ justifyContent: "start" }}>
                    {bundles && bundles.length === 0 && (
                      // variant="h6"
                      <Button
                        variant="contained"
                        className={classes.btn}
                        style={{ minWidth: "200px" }}
                        onClick={() => setOpenAddBundle(true)}
                      >
                        {t("profile.createABundle")}
                      </Button>
                    )}
                    {bundles.map((data, i) => {
                      const status = list.includes(data._id);
                      return (
                        <Box
                          key={i}
                          mr={2}
                          style={
                            status
                              ? {
                                width: "200px",
                                height: "150px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#c04848",
                                color: "white",
                              }
                              : {
                                width: "200px",
                                height: "150px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }
                          }
                          onClick={() => {
                            updateSelectedBundle(data._id);
                          }}
                        >
                          <Typography className="seats">
                            {data.tokenName}
                          </Typography>

                          {status ? <span> {t("profile.selected")}</span> : ""}
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="center">
                {isSubmit && list.length === 0 && (
                  <FormHelperText error>{t("profile.pleaseSelectBundle")}</FormHelperText>
                )}
              </Box>
            </Box>
          </Box>

          <Box align="center" mt={5}>
            {/* // variant="h6" */}
            <Button
              variant="contained"
              className={classes.shareBtn}
              onClick={submitHandler}
              disabled={loader}
            >
              {t("profile.share")} {loader && <ButtonCircularProgress />}
            </Button>
            {/* variant="h6" */}
            <Button
              // variant="h6"
              variant="contained"
              className={classes.backBtn}
              style={{ minWidth: "200px", marginLeft: 8 }}
              disabled={loader}
              onClick={() => history.goBack()}
            >
              {t("profile.back")}
            </Button>
          </Box>
        </Container>
        {openAddBundle && (
          <AddBundlePopup
            open={openAddBundle}
            handleClose={() => setOpenAddBundle(false)}
            callbackFun={bundle}
          />
        )}
      </Grid>
    </Grid>
  );
}

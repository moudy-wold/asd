import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  List,
  ListItem,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import TelegramIcon from "@material-ui/icons/Telegram";
import { FaFacebookF } from "react-icons/fa";
import { GrMedium } from "react-icons/gr";
import { AiOutlineTwitter } from "react-icons/ai";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { AiFillYoutube } from "react-icons/ai";
import { } from "react-feather";
import Logo from "./../../component/Logo";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  footerSection: {
    // background: "#9105bd",
    backgroundImage: "url('./images/hero-background.png')",
    position: "relative",
    borderTop: "1px solid #3280c3",
    backgrounClip: "cover",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: "#fff",
    "& h5": {
      fontWeight: "bold",
      fontSize: "16px",
      letterSpacing: "2px",
      textTransform: "uppercase",
    },
    "& p": {
      marginBottom: "20px",
      marginTop: "10px",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
    },
    "& svg": {
      color: "#000",
      fontSize: "15px",
      paddingLeft: "10px",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
  },
  input_fild: {
    backgroundColor: "#ffffff6e",
    borderRadius: "10px",
    color: "#fff",
    height: "48px",
    width: "100%",
    borderBottom: "none",
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

  footerBg: {
    width: "200px",
    //width:"100%"
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100px",
      // margin: "auto",
      marginLeft: "30px",
    },
  },
  ListItem: {
    paddingLeft: "0px",
  },
  borderBottmo: {
    overflow: "hidden",
    background: "#000",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
  signupBtn: {
    color: "#0F8ACA",
    borderRadius: "10px",
    display: "flex",
    fontSize: "16px",
    fontWeight: "bold",
    height: "48px",
    minWidth: "135px",
    boxShadow:
      "0px 8px 24px rgba(38, 50, 56, 0.1), 0px 16px 32px rgba(38, 50, 56, 0.08)",
    lineHeight: "36px",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: " 1px",
    background: "#fff",
    "&:hover": {
      background: "#fff",
      color: "#0F8ACA",
    },
  },
  largeIcon: {
    width: 18,
    height: 18,
    marginRight: "8px",
  },
  icons: {
    justify: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justify: "center",
    },
  },
  media: {
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  join: {
    marginTop: "10px",
    color: "#FFF",
    opacity: ".7",
    fontWeight: "300",
    fontSize: "16px",
    // width:"100px",
    // '@media (max-width:425px)': {
    //   fontSize: '15px',
    //   // marginLeft: "px",
    //   // marginLeft:"-60px"
    //   // marginRight: '35px',
    // },
    // '@media (max-width:320px)': {
    //   fontSize: '15px',
    //   // marginLeft: "px",
    //   // marginLeft: '50px',
    // },
    // '@media (max-width:768px)': {
    //   fontSize: '13px',
    //   // marginLeft: "px",
    //   marginLeft: '15px',
    // },
  },
  footerBg: {
    width: "45%",
    "@media(max-width:425px)": {
      width: "45%",
      // marginLeft:"95px",
    },
    "@media(max-width:768px)": {
      width: "60%",
      position: "relative",
      left: "0px",
    },
    "@media(max-width:320px)": {
      width: "50%",
      // position:"relative",
      // left:"0px"
      // marginRight:"50px"
    },
  },
  list: {
    paddingTop: "8px",
    paddingBottom: "8px",
  },

  footerBg: {
    marginTop: "40px",
    marginBottom: "30px",
    width: "45%",
    transition: "all .2s linear",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  linkParent: {

  },
  a: {
    color: "#FFF",
    "& svg": {
      color: "#FFF",
      fontSize: "25px",
      backgroundColor: "#333067",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      padding: "10px",
      margin: "5px",
      transition: "all .1s linear",
      "&:hover": {
        transform: "scale(1.2)",
        background: "#FFF",
        color: "#333067",
      },
    },
  },
}));

export default function Liquidity() {
  const [t, i18n] = useTranslation();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [socialList, setSocialList] = useState([]);
  const accessToken = window.localStorage.getItem("token");


  useEffect((pages) => {
    setIsLoading(true);
    axios
      .get(Apiconfigs.staticContentList, {
        headers: {
          token: accessToken,
        },
      })
      .then((response) => {
        if (response.data.statusCode !== 200) {
        } else {
          setIsLoading(false);
          setUsers(response.data.result);
          console.log(response);
        }
      })
      .catch((response) => {
        console.log("response", response);
      });
  }, []);
  const socailHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listSocial,
      });

      if (res.data.statusCode === 200) {
        setSocialList(res.data.result);
      } else {
        setSocialList();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    socailHandler();
  }, []);

  return (
    <>
      <Box className={classes.footerSection}>
        <Box>
          <Box maxWidth="xl">
            <Grid
              container
              justify="space-around"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={12} md={12} lg={12}>
                <Grid container spacing={1} justifyContent="center">
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    md={3}
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Link to="/">
                      <img
                        src="images/footer-logo.svg"
                        alt=""
                        className={classes.footerBg}
                      />
                    </Link>
                    <Typography variant="h6" className={classes.join}>
                      {t("footer.description")}
                    </Typography>
                    <ListItem
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                    </ListItem>
                  </Grid>
                  {/* End logo section */}

                  {/* start Links Section */}
                  <Grid item xs={5} sm={3} md={2} style={{ marginLeft: "10px" }}>
                    {users &&
                      users.slice(0, 4).map((row, i) => {
                        return (
                          <List className="listingFooter2" key={1}>
                            <ListItem>
                              <Link
                                to={{
                                  pathname: "/privacy-policy",
                                  state: {
                                    id: row.type,
                                  },
                                }}
                              >
                                {row.title}
                              </Link>
                            </ListItem>
                          </List>
                        );
                      })}
                  </Grid>
                  <Grid item xs={5} sm={3} md={2}>
                    {/* <List className="listingFooter">
                      <ListItem>
                        <Link target="_blank" to="/company">
                          Company
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          target="_blank"
                          to="/risk-statment"
                          className={classes.list}
                        >
                          Risk disclosure statement
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          target="_blank"
                          to="/kyc-program"
                          className={classes.list}
                        >
                          KYC program
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          to={false}
                          className="footer_btn"
                          style={{ color: "#fff" }}
                        >
                          Become a MAS
                        </Link>
                      </ListItem>
                    </List> */}
                    {users &&
                      users.slice(4, 7).map((row, i) => {
                        return (
                          <List className="listingFooter2" key={2}>
                            <ListItem>
                              <Link
                                to={{
                                  pathname: "/privacy-policy",
                                  state: {
                                    id: row.type,
                                  },
                                }}
                              >
                                {row.title}
                              </Link>
                            </ListItem>
                          </List>
                        );
                      })}
                    {/* <ListItem>
                      <Link
                        to={false}
                        className="footer_btn"
                        style={{ color: "#fff" }}
                      >
                        Become a MAS
                      </Link>
                    </ListItem> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    className={classes.media}
                    style={{ paddingTop: "20px" }}
                  >
                    <Box className={classes.linkParent}>
                      <Typography
                        variant="h6"
                        style={{ display: "block", textAlign: "center", paddingBottom: "20px", color: "#FFF", fontSize: "18px", marginTop: "15px", }}
                      >
                        {t("footer.joinTheCommunity")}
                      </Typography>
                      <Box style={{ display: "flex", margin: "auto", width: "fit-content", }}>
                        <a href={socialList[0]?.link} target="_blank" rel="noreferrer" className={classes.a}>
                          <FaFacebookF />
                        </a>
                        <a href={socialList[2]?.link} target="_blank" rel="noreferrer" className={classes.a}>
                          <AiOutlineTwitter />
                        </a>
                        <a href={socialList[3]?.link} target="_blank" rel="noreferrer" className={classes.a}>
                          <AiFillYoutube />
                        </a>
                        <a href={socialList[1]?.link} target="_blank" rel="noreferrer" className={classes.a}>
                          <TelegramIcon />
                        </a>
                        <a href={socialList[4]?.link} target="_blank" rel="noreferrer" className={classes.a}>
                          <GrMedium />
                        </a>
                      </Box>
                    </Box>
                    {/* <ListItem>
                      <Link
                        to={false}
                        className="footer_btn"
                        style={{ color: "#fff" }}
                      >
                        Become a MAS
                      </Link>
                    </ListItem> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <div style={{
              width: "90%", height: "1px",
              background: "#3e407b", margin: "10px auto"
            }} ></div>
            <p style={{ margin: "13px auto", fontSize: "17px", width: "fit-content", opacity: ".8", }}>{t("footer.copyright")}</p>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  Tooltip,
  IconButton,
  Drawer,
  InputBase,
  Grid,
  Badge,
  MenuItem,
  Box,
  Container,
  Menu,
  Grow,
  Paper,
  Popper,
  MenuList,
  Typography,
  Link as MeterialLink,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  AiOutlineSearch,
  AiOutlineLogout,
  AiOutlineLogin,
} from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import SearchIcon from "@material-ui/icons/Search";
import { UserContext } from "src/context/User";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { BsChat, BsMoonStarsFill, BsFillCaretDownFill } from "react-icons/bs";
import React, { useContext, useState, useEffect, useRef } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory, useLocation, Link } from "react-router-dom";
import DataLoading from "src/component/DataLoading";
import Logo from "./../../component/Logo";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import User from "src/component/User";
import NotificationCard from "src/component/NotificationCard";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import NoDataFound from "src/component/NoDataFound";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import InputAdornment from "@material-ui/core/InputAdornment";
import './style.css';
import { MdLanguage } from "react-icons/md";
import ProfileBar from './navbarItems/ProfileBar'
import UserBar from './navbarItems/UserBar'
import NftBar from './navbarItems/NftBar'
import CreatorBar from './navbarItems/CreatorBar'
import BundleBar from './navbarItems/BundlsBar'
import UsersList from '../../component/UsersList';
import Landuage from './Landuage';
import SelectOtherProps from './SelectOtherProps';
import 'antd/dist/antd.css';
import { GiSun } from "react-icons/gi";
import { TbLanguageKatakana } from "react-icons/tb";
import 'antd/dist/antd.css';
import { Dropdown, Space } from 'antd';
import { useTranslation } from "react-i18next";
import Login from "../../views/pages/Profile/Profile"
import { PlaneListPopup } from "../../views/pages/Profile/Profile"
import Activity from "../../views/pages/Profile/Tabs"
import BundleDetails from "../../views/pages/Profile/Bundles/BundleDetails";
import Tabs from "../../views/pages/Profile/Tabs";
import ShareAudience from "../../views/pages/Profile/ShareAudience";
import AddBundlePopup from "../../views/pages/Profile/Bundles";
import DepositAllTransaction from "../../views/pages/Profile/DepositAllTransaction";
import Chat from "../../views/pages/Chat/index";
import Profile from "../../views/pages/Profile/Profile";
import ProfileSetting from "../../views/pages/UserSignUp/ProfileSetting";
import IndexFromHome from "../../views/pages/Home/index";
import PageLoading from "../../component/PageLoading";

const headersData = [
  {
    label: "My Profile",
    href: "/profile",
    isLink: true,
    comp: <ProfileBar />
  },
  {
    label: "Users",
    href: "/user-list",
    isLink: true,
    comp: <UserBar />
  },
  {
    label: "Creators",
    href: "/SearchResult",
    isLink: true,
    comp: <CreatorBar />
  },
  {
    label: "Bundles",
    href: "/bundles_home",
    isLink: true,
    comp: <BundleBar />
  },

  {
    label: "NFT",
    // href: "#auctions",
    href: "#",
    isLink: true,
    comp: <NftBar />
  },
  {
    label: "Metaverse",
    href: "/metaverse",
    isLink: true,
  },

];

const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "600",
    borderRadius: 0,
    minWidth: "auto",
    color: theme.palette.secondary.main,
    height: "30px",
    padding: "0px 7px",
    letterSpacing: "1px",
    marginLeft: "15px",
    color: "black",
    "@media (max-width: 900px)": {
      color: "#FFF",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "&:active": {
      color: theme.palette.secondary.dark,
    },
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  menuButton1: {
    width: "100%",
  },
  toolbar: {
    display: "flex",
    // padding: "10px 0",
    justifyContent: "space-between",
    height: "100%",
    "@media (max-width: 900px)": {
      paddingLeft: "75px",
      paddingRight: "20px",
      height: "100%",
    },
  },

  logoDrawer: {
    paddingLeft: "10px",
    width: "140px",
    marginBottom: "30px",
  },
  drawerContainer: {
    padding: "20px 0px ",

    background: "#fff",
    width: "240px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media(max-width:500px)": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    },
  },
  drawericon: {
    color: "#000",
    position: "absolute",
    top: "0px",
    right: "0px",
    fontSize: "25px",
  },
  logoImg: {
    width: "75px",
    // height: '44.5px',
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
    },
  },
  flexButton: {
    display: "flex",
    justifyContent: "flex-between",
    alignItems: "center",
  },
  menuMobile: {
    fontSize: "16px",
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: "-0.6px",
    lineHeight: "1.75",
    padding: "16px",
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
    "@media (max-width: 500px)": {
      padding: "7px 0",
      width: "100%",
    },
  },
  paper1: {
    background: "black",
    color: "white",
  },
  containerHeight: {
    height: "100%",
    background: "#FFF",
    height: "54px",
  },
  mainHeader: {
    justifyContent: "space-between",
    padding: "0px",
    backgroundColor: "#2c0355 !important",
    // backgroundColor: "#FFF !important",
    width: "100%",
    "@media(max-width:567px)": {
      height: "60px",
    },
  },
  searchTab: {
    cursor: "pointer",
    display: "flex",
    "@media(max-width:768px)": {
      maxHeight: "33px",
    },

  },
  createButton: {
    color: "#fff",
    backgroundImage: "tansparent",
    border: "1px solid #FFF",
    margin: "0px 10px",
    // "@media(max-width:768px)": {
    //   display: "none",
    // },
    "&:hover": {
      background: "#FFF",
      color: "#348ddb",
    },
  },
  loginBtn: {
    width: "fit-content !important",
    background: "transparent !important",
    transition: "all .2s linear",
    padding: "0 5px",
    backgroundSize: "100%!important",
    backgroundRepeat: "repeat!important",
    background: "linear-gradient(270deg, #ffd800, #cc00ff)!important",
    "-webkitTextFillColor": "transparent!important",
    "-webkitBackgroundClip": "text!important",
    "&:hover": {
      backgroundSize: "100%!important",
      backgroundRepeat: "repeat!important",
      background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
      "-webkitTextFillColor": "transparent!important",
      "-webkitBackgroundClip": "text!important",
      transform: "scale(1.11)",
      "&:hover svg": {
        transform: "scale(1.11)",
        color: "#499072!important",
      },
    },
    "& svg": {
      fontSize: "22px",
      maginLeft: "5px",
      color: "#cc00ff!important",
      transition: "all .2s linear",
    },
  },
  searchIcon: {
    fontSize: "16px",
    padding: theme.spacing(0, 1),
    color: "#c100fb",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    fontSize: "12px",
    width: "100%",
    color: "#FFF!important",
    "& input": {
      color: "#FFF!important"
    },
  },
  wallet: {
    fontSize: "14px",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "21px",
    color: "#fff",
    border: "1px solid #ec0066",
    padding: "0 15px",
    background: "#ec0066",
    borderRadius: "50px",
    height: "30px",
    "&:hover": {
      background: "#fff",
      color: "#ec0066",
    },
    "@media (max-width: 900px)": {
      marginLeft: "12px",
      marginTop: "12px",
    },
  },
  inputInput: {
    padding: "8px",
    fontSize: "13px",
    transition: theme.transitions.create("width"),
    width: "150px !important",
    color: "#FFF!important",
    "&::placeholder": {
      color: "#FFF !important",
    },
    "&:focus": {
      width: "100%",
    },
    "& input": {
      width: "100%",
      color: "#FFF!important",
      "&::placeholder": {
        color: "#FFF !important",
      },
    },
    "@media(min-width:991px)": {
      color: "#000!important",
    },
  },
  submenu: {
    borderTop: "3px solid #300760",
    top: "25px !important",
  },
  menuMobile1: {
    marginLeft: "10px",
    backgroundColor: " #FCF2FA",
    borderRadius: "40px",
    "& h4": {
      fontSize: "14px",
      lineHeight: " 17px",
      color: "#D200A5",
      margin: "0 5px",
    },
    "&:hover": {
      backgroundColor: " #FCF2FA",
      borderRadius: "40px",
    },
    "& figure": {
      margin: 0,
      width: 40,
      height: 40,
      borderRadius: "50px",
      overflow: "hidden",
      display: "flex",
      justifyContent: " center",
      alignItems: "center",
      "& img": {
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
      },
    },
  },
  imgbox: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "5px",
  },
  imgbox1: {
    display: "flex",
    justifyContent: "center",
  },
  searchfield: {
    marginTop: "6px",
    background: "white",
    // marginTop: 6px;
    maxHeight: "66vh",
    height: "auto",
    width: "290px",
    // height: "200px",
    overflowY: "scroll",
    "@media(max-width:816px)": {
      marginLeft: "-56px",
      width: "274px",
      maxHeight: "54vh",
    },
  },

  handleDialog: {
    "@media (max-width:500px)": {
      minwidth: "200px",
    },
    "& .MuiDialog-paperScrollPaper": { maxHeight: "78vh" },
    "& .walletheading": {
      width: " 500px",
      margin: 0,
      display: "flex",
      alignItems: " center",
      justifyContent: "space-between",
      borderBottom: " 1px solid #cecece",
      padding: " 5px",
      paddingBottom: "20px",
      fontSize: "14px",
      color: "#000",
      position: "relative",
      [theme.breakpoints.down("md")]: {
        width: " 100%  ",
      },
      "& span": {
        position: "absolute",
        bottom: 3,
        right: 5,
        fontSize: "12px",
        color: "#9e9e9e",
      },
    },
    "& .notificationexpand": {
      textAlign: "center",
    },
    "& .MuiDialogContent-root": {
      "@media (max-width:500px)": {
        // width: "264px",
        // textAlign: "center",
        width: "307px",
        // display: "flex",
        // flexDirection: "column",
      },
      "@media (max-width:380px)": {
        // width: "264px",
        // textAlign: "center",
        width: "250px",
        // display: "flex",
        // flexDirection: "column",
      },

      "@media (max-width:350px)": {
        // width: "264px",
        // textAlign: "center",
        width: "210px",
        // display: "flex",
        // flexDirection: "column",
      },
    },
    "& .MuiDialogActions-root": {
      display: "flex",
      justifyContent: "center",
    },
    "& .MuiDialog-container": {
      position: "absolute",
      right: 1,
      top: "6%",
    },
    "& .MuiDialog-scrollPaper": {
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
    },
  },
  boxsearchIcon: {
    border: "1px solid #499072",
    borderRadius: "29px",
    width: "150px",
    "& input": {
      width: "100%",
      padding: '3px 10px 0px',
      color: "#000!important",
      "&::placeholder": {
        color: "#000!important",
      }
    },
  },
  boxsearchIcon1: {
    position: "absolute",
    maxWidth: "188px",
    display: "flex",
    left: "75px",
    top: "16px",
    marginRight: "29px",
    border: "1px solid gray",
    borderRadius: "29px",
    top: "16px",
    maxHeight: "33px",
  },
  loginModal: {
    textAlign: "center",
    "& span": {
      color: "#FFF!important",
    },
  },
  loginModalButtonBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  icons: {
    transition: "all .2s linear",
    color: "#c100fb!important",
    "&:hover": {
      color: "#499072!important",
      transform: "scale(1.11)",
      background: "transparent !important",
    },
    "& svg": {
      transition: "all .2s linear",
      color: "#c100fb!important",
      "&:hover": {
        color: "#499072!important",
        transform: "scale(1.11)",
      },
    },
  },
  liginIcon: {
    "& svg": {
      fontSize: "22px!important",
      marginLeft: "4px",
    },
  },
  liList: {
    padding: "6px !important",
  },
  languageIcon: {
    cursor: "pointer",
    "& svg": {
      color: "#499072!important",
    },
    marginLeft: "10px",
    marginRight: "10px",
    fontSize: "22px",
    color: "#c100fb!important",
    marginBottom: "6px",
    "&:hover": {
      color: "#499072!important",
    },
  },
  drop: {
    backgroundColor: "#FFF",
    border: 'none!important',
    color: "#FFF",
    "&:hover": {
      backgroundColor: "transparent"
    },

  },
  dropMob: {
    backgroundColor: "#FFF",
    border: 'none!important',
    color: "#FFF",
    position: "absolute",
    "&:hover": {
      backgroundColor: "transparent"
    },

  },
  btn: {
    fontSize: "17px",
    fontWeight: "500",
    margin: "0",
    marginTop: "5px",
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
  },
  dialogParent: {
    "& div": {
      borderRadius: "15px",
    },
  },
  dialogContainer: {
    padding: "20px",
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    // boxShadow: "5px 5px 15px #c100fb, -5px -5px 20px #22c37f",
    borderRadius: "15px",
  },
  creatorOrSubBtn: {
    fontSize: "18px",
    fontWeight: "500",
    margin: "0",
    // backgroundSize: "100%!important",
    // backgroundRepeat: "repeat!important",
    background: "linear-gradient(270deg,#ce09ff,#ffa34e)!important",
    color: "#FFF",
    // "-webkitTextFillColor": "transparent!important",
    // "-webkitBackgroundClip": "text!important",
    transition: "all .2s linear",
    "&:hover": {
      // transform: "scale(1.1)",
      transform: "translateY(-4px)",
      color: "#FFF",
    },
  },
  logBox: {
    display: "flex",
    marginRight: "22px",
  },
}));
export default function Header() {
  const [t, i18n] = useTranslation();
  const classes = useStyles();
  const [toggle, setToggle] = React.useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLogOutOpen, setIsLogoutOpen] = useState(false);
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [userList, setUserList] = useState();
  const auth = useContext(UserContext);
  const search = auth?.search;
  const setsearch = auth?.setsearch;
  const [notify, setNotify] = useState([]);
  useEffect(() => {
    setNotify(auth?.notifyData);
  }, [auth?.notifyData]);
  const [open, setOpen] = useState(false);

  const readNotificationhandler = async () => {
    try {
      const res = await axios.get(Apiconfigs.readNotification, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    } catch (error) { }
  };
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
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            // setsearch('')
            setIsLoading1(true);
            setNoOfPages(res.data.result.pages);
            setUserList(res.data.result.docs);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const {
    menuMobile,
    menuButton,
    menuButton1,
    divstake,
    toolbar,
    searchTab,
    searchIcon,
    flexButton,
    inputInput,
    drawerContainer,
    drawericon,
    inputRoot,
    logoDrawer,
    containerHeight,
    mainHeader,
    wallet,
    menuMobile1,
    submenu,
    loginModal,
    loginModalButtonBox,
  } = useStyles();
  const [searchState, setSearchState] = useState(false);
  const openSearch = () => {
    searchState == false && setSearchState(true);
  }
  const closeSearch = () => {
    searchState == true && setSearchState(false);
  }
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const { mobileView, drawerOpen } = state;
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl1(null);
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);
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
  const [open1, setOpen1] = useState({ community: false, user: false });
  const anchorRef = { community: useRef(null), user: useRef(null) };
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const ProfileId = auth?.userData?._id;

  // const handleToggle = (name) => {
  //   setOpen1({ ...open1, [name]: !open1[name] });
  // };

  const [users, setUsers] = useState([]);
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
        }
      })
      .catch((response) => {
        console.log("response", response);
      });
  }, []);
  const handleClose2 = (event, name) => {
    if (
      anchorRef[name].current &&
      anchorRef[name].current.contains(event.target)
    ) {
      return;
    }

    setOpen1({ ...open1, [name]: false });
  };

  function handleListKeyDown(event, name) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen1({ ...open1, [name]: false });
    }
  }
  window.addEventListener("click", function (event) {
    setsearch("");
  });
  function myFunction() {
    alert("Hello World!");
  }
  const displayDesktop = () => {
    return (
      <Box maxWidth="lg">
        <Container maxWidth="lg">
          <Toolbar className={toolbar}>
            {femmecubatorLogo}
            <Grid
              container
              item
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ paddingLeft: "0px" }}
            >
              <div>
                {getMenuButtons()}
                {users &&
                  users.slice(7, 8).map((row, i) => {
                    return (
                      <Button key={i}
                        className={classes.menuButton}
                        onClick={() => {
                          history.push({
                            pathname: "/metaverse",
                            state: {
                              id: row.type,
                            },
                          });
                        }}
                      >
                        {t('navBar.metaverse')}
                      </Button>
                    );
                  })}
              </div>

              {/* <li>
              <Tooltip title="Chat" placement="bottom">
                <IconButton onClick={() => history.push("/chat")}>
                  <Badge badgeContent={auth.unreadChats} color="primary">
                    <BsChat style={{ color: "#000" }} size="20px" />{" "}
                  </Badge>
                </IconButton>
              </Tooltip>
            </li> */}
              {/* <li>
              <Tooltip title="Notification" placement="bottom">
                <IconButton
                  onClick={() => {
                    readNotificationhandler();
                    setOpen(true);
                  }}
                >
                  <Badge badgeContent={auth.unReadNotification} color="primary">
                    <NotificationsIcon style={{ color: "#000" }} size="12px" />
                  </Badge>
                </IconButton>
              </Tooltip>
            </li> */}

              <div className={flexButton}>
                <div className={searchTab} onClick={() => openSearch()}>
                  <div className={searchIcon} >
                    <SearchIcon />
                  </div>
                  {searchState == true &&
                    <Box
                      className={classes.boxsearchIcon}
                      style={
                        auth.userLoggedIn
                          ? { right: "285px" }
                          : { right: "258px" }
                      }
                    >
                      <div style={{ display: "flex", alignItems: "center", padding: "5px 0" }}>
                        <InputBase
                          placeholder="Search.."
                          onChange={(e) => setsearch(e.target.value)}
                          classes={{
                            root: inputRoot,
                            input: inputInput,
                          }}
                          inputProps={{ "aria-label": "search" }}
                          endAdornment={
                            <InputAdornment position="end" style={{ display: "flex", alignItems: "center", }}>
                              {isLoading && (
                                <Box style={{ display: "flex", alignItems: "center", }} >
                                  <DataLoading />
                                  <CloseIcon
                                    style={{ color: "#499072", cursor: "pointer", marginRight: "5px", }}
                                    onClick={() => closeSearch()}
                                  />
                                </Box>
                              )}
                            </InputAdornment>
                          }
                        />
                        {/* {isLoading ? (
                          <DataLoading />
                        ) : ( */}
                        {search !== "" && (
                          <>
                            <Box minWidth="xl" className={classes.searchfield}>
                              {!isLoading && userList && userList.length === 0 ? (
                                <NoDataFound />
                              ) : (
                                ""
                              )}
                              {userList &&
                                userList?.map((data, i) => {
                                  return (
                                    <User
                                      // onClick={() => window.}
                                      key={i}
                                      search={search}
                                      isLoading1={isLoading1}
                                      setIsLoading1={setIsLoading1}
                                      setsearch={setsearch}
                                      userList={userList}
                                      setUserList={setUserList}
                                      users={data}
                                      history={history}
                                    />
                                  );
                                })}
                            </Box>
                            {/* <Dialog
                                open={search !== ""}
                                fullWidth
                                maxWidth="md"
                                onClose={handleClose1}
                                className={classes.handleDialog}
                                aria-labelledby="scroll-dialog-title"
                                aria-describedby="scroll-dialog-description"
                              >
                                <DialogTitle
                                  id="scroll-dialog-title"
                                  style={{ color: "#19194b" }}
                                ></DialogTitle>
                                <DialogContent>
                                  <Box
                                    minWidth="xl"
                                    className={classes.searchfield}
                                  >
                                    {!isLoading &&
                                      userList &&
                                      userList.length === 0 ? (
                                      <NoDataFound />
                                    ) : (
                                      ""
                                    )}
                                    {userList &&
                                      userList?.map((data, i) => {
                                        return (
                                          <User
                                            search={search}
                                            isLoading1={isLoading1}
                                            setIsLoading1={setIsLoading1}
                                            setsearch={setsearch}
                                            userList={userList}
                                            setUserList={setUserList}
                                            users={data}
                                            history={history}
                                          />
                                        );
                                      })}
                                  </Box>

                                </DialogContent>
                              </Dialog> */}
                          </>
                        )}
                        {/* )} */}
                      </div>
                    </Box>
                  }
                </div>
                {ProfileId && (
                  <Box style={{ marginRight: "-38px" }}>
                    <Tooltip title="Chat" placement="bottom">
                      <IconButton onClick={() => history.push("/chat")}>
                        <Badge badgeContent={auth.unreadChats} color="primary">
                          <BsChat className={classes.icons} size="20px" />{" "}
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                {ProfileId && (
                  <Box style={{ marginRight: "-25px", }}>
                    <li className={classes.liList}>
                      <Tooltip title="Notification" placement="bottom">
                        <IconButton
                          onClick={() => {
                            readNotificationhandler();
                            setOpen(true);
                          }}
                        >
                          <Badge
                            badgeContent={auth.unReadNotification}
                            color="primary"
                          >
                            <NotificationsIcon
                              className={classes.icons}
                              size="12px"
                            />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                    </li>
                  </Box>
                )}
                <Box>
                  {/* Start language Icon */}
                  <Space direction="vertical" style={{}}>
                    <Space wrap>
                      <Dropdown overlay={<Landuage />} placement="bottomLeft" className={classes.drop}>
                        <Button className={classes.btn}><MdLanguage className={classes.languageIcon} /></Button>
                      </Dropdown>
                    </Space>
                  </Space>
                  {/* End language Icon */}

                  {/* FOR COLOR MODE */}
                  {/*{auth.col == "sun" ?(<GiSun onClick={() => auth.handleCol()}
                    className={classes.colMode} />) : (<BsMoonStarsFill onClick={() =>
                      auth.handleCol()} className={classes.colMode} />)} */}
                  <Tooltip
                    title={auth.userLoggedIn ? "Logout" : "Login"}
                    placement="bottom"
                  >
                    <IconButton
                      // onClick={() => {
                      //   auth.logOut()
                      //   history.push('/login')
                      // }}
                      onClick={() => {
                        if (auth.userLoggedIn) {
                          // auth.logOut()
                          setIsLogoutOpen(true);
                        } else {
                          setOpenLoginModal(true);
                        }
                      }}
                    >
                      {auth.userLoggedIn ? (
                        <AiOutlineLogout
                          style={{ color: "#000" }}
                          size="25px"
                        />
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.loginBtn}
                        >
                          {t('login.login')}
                          <BiExit />
                        </Button>
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/create-nft"
              >
                Create On MAS
              </Button> */}

                {/* <Button variant="contained" color="primary">
                Connect Wallet
              </Button> */}
                {stackmenu}
              </div>
            </Grid>
          </Toolbar>
        </Container>
      </Box>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={mainHeader}>

        {/* Start Burger Parent */}
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >

          {/* Start Burger Container */}
          <div className={drawerContainer}>

            {/* Start  Image Box */}
            <Box className={classes.imgbox}>
              <img className={logoDrawer} src="images/logo.png" alt="" />
            </Box>
            {/* End Image Box */}

            {/* Start All Icons Container */}
            <Box className={classes.imgbox1}>

              {/* Start language chat  Notification Icons Parent*/}
              {auth.userLoggedIn ? (
                <>
                  {/* Start Language Icon */}
                  <Space direction="vertical" style={{ marginLeft: "10px" }}>
                    <Space wrap>
                      <Dropdown overlay={<Landuage />} placement="bottomLeft" className={classes.drop}>
                        <Button className={classes.btn}><MdLanguage className={classes.languageIcon} /></Button>
                      </Dropdown>
                    </Space>
                  </Space>
                  {/* End Language Icon */}

                  {/* Start  Chat Icon */}
                  <Box>
                    <Tooltip title="Chat" placement="bottom">
                      <IconButton onClick={() => history.push("/chat")}>
                        <Badge badgeContent={auth.unreadChats} color="primary">
                          <BsChat className={classes.icons} size="20px" />{" "}
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {/* End  Chat Icon */}

                  {/* Start  Notification Icon */}
                  <Box>
                    <Tooltip title="Notification" placement="bottom">
                      <IconButton
                        onClick={() => {
                          readNotificationhandler();
                          setOpen(true);
                        }}
                      >
                        <Badge
                          badgeContent={auth.unReadNotification}
                          color="primary"
                        >
                          <NotificationsIcon
                            className={classes.icons}
                            size="12px"
                          />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {/* End  Notification Icon */}

                </>

              ) : (
                ""
              )}
              {/* End language chat  Notification Icons Parent*/}

              {/* Start Login/LogOut Icon */}
              <Box className={classes.logBox}>
                {/* FOR COLOR MODE */}
                {/* {auth.col == "sun" ?
                  (<GiSun onClick={() => auth.handleCol()} className={classes.colMode} />) : (<BsMoonStarsFill onClick={() => auth.handleCol()} className={classes.colMode} />)} */}
                <Tooltip
                  title={auth.userLoggedIn ? "Logout" : "Login"}
                  placement="bottom"
                >
                  <IconButton
                    onClick={() => {
                      if (auth.userLoggedIn) {
                        // auth.logOut()
                        setIsLogoutOpen(true);
                      } else {
                        setOpenLoginModal(true);
                      }
                    }}
                  // onClick={() => setOpenLoginModal(true)}
                  >
                    {auth.userLoggedIn ? (
                      <AiOutlineLogout style={{ color: "#FFF" }} size="25px" />
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        className={classes.loginBtn}
                      >
                        {t('login.login')}
                        <BiExit />
                      </Button>
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
              {/* End Login/LogOut Icon */}
            </Box>
            {/* End  All Icons Container */}

            {getDrawerChoices()}
            {/* Start  links List */}
            {users &&
              users.slice(7, 8).map((row, i) => {
                return (
                  <Button key={i}
                    className={classes.menuMobile}
                    onClick={() => {
                      history.push({
                        pathname: "/metaverse",
                        state: {
                          id: row.type,
                        },
                      });
                    }}
                  >
                    {t('navBar.metaverse')}
                  </Button>
                );
              })}
            {/* End  links List */}

            {/* <Button
              className={wallet}
              aria-controls="simple-menu"
              aria-haspopup="true"
              to="/wallet"
              component={Link}
            >
              Connect wallet
            </Button> */}
            {stackmenu}
          </div>
          {/* Start Burger Container */}
        </Drawer>
        {/* End Burger Parent */}
        <div>{femmecubatorLogo}</div>
        <Grid container>
          <Grid item xs={10}>
            <div className={searchTab}>
              <Box className={classes.boxsearchIcon1} style={{ display: "flex!important", }}>
                <div className={searchIcon} style={{ width: "10px!important", margin: "10px!important" }} >
                  <SearchIcon />
                </div>
                <div>
                  <InputBase
                    placeholder="Search.."
                    onChange={(e) => setsearch(e.target.value)}
                    classes={{
                      root: inputRoot,
                      input: inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                  {/* {isLoading ? (
                    <DataLoading />
                  ) : ( */}
                  <Box minWidth="xl" className={classes.searchfield}>
                    {!isLoading && userList && userList.length === 0 ? (
                      <NoDataFound />
                    ) : (
                      ""
                    )}
                    {userList &&
                      isLoading1 &&
                      userList?.map((data, i) => {
                        return (
                          <User
                            key={i}
                            isLoading1={isLoading1}
                            setIsLoading1={setIsLoading1}
                            setsearch={setsearch}
                            userList={userList}
                            setUserList={setUserList}
                            users={data}
                            history={history}
                          />
                        );
                      })}
                  </Box>
                  {/* )} */}
                </div>
              </Box>
            </div>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              className={drawericon}
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
              }}
            >
              <MenuIcon
                width="60px"
                height="60px"
                style={{ color: "#197ab3", fontSize: "30px" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href, isLink }) => {
      return (
        <>
          {isLink ? (
            <>
              <Button
                {...{
                  key: label,
                  color: "inherit",
                  to: href,
                  component: Link,
                  className: menuButton1,
                }}
              >
                <MenuItem className={menuMobile}>{label}</MenuItem>
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                history.push("/");
                setTimeout(() => {
                  window.location = href;
                }, 700);
              }}
              {...{
                key: label,
                color: "inherit",
                // href: href,
                // component: MeterialLink,
                className: menuButton1,
              }}
            >
              <MenuItem className={menuMobile}>{label}</MenuItem>
            </Button>
          )}
        </>
      );
    });
  };

  const femmecubatorLogo = (
    <Box>
      <Link to="/">
        <Logo className="logoImg" />
      </Link>
    </Box>
  );
  const stackmenu = (
    <div>
      {/* <IconButton
        aria-label="delete"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick1}
        className={menuMobile1}
        size="small"
      >
        <figure>
          <img src="/images/profile.png" alt="" />
        </figure>
        <Typography variant="h4">achandra99</Typography>
        <BsFillCaretDownFill style={{ color: "#D200A5", fontSize: "16px" }} />
      </IconButton> */}

      <Box className={divstake}>
        <Menu
          id="simple-menu"
          disableScrollLock={true}
          anchorEl={anchorEl1}
          keepMounted
          open={Boolean(anchorEl1)}
          onClose={handleClose4}
        >
          <MenuItem
            onClick={() => {
              history.push("/become-creator");
            }}
          >
            {t('navBar.becomeacreator')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/profile");
            }}
          >
            {t('navBar.myProfile')}
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
  const getMenuButtons = () => {
    // return headersData.map(({ label, href, isLink, comp }) => {
    //   return (
    //     <>
    //       {isLink ? (
    //         <>
    //           {/* <Button
    //             {...{
    //               key: label,
    //               color: "inherit",
    //               to: href,
    //               component: Link,
    //               className: menuButton,
    //             }}
    //           >
    //             {label}
    //           </Button> */}

    //           <span className={style.navItem} >
    //             <Dropdown placement="bottom" overlay={comp}>
    //               <span className={style.dropdownLink} href="/#">
    //                 {label}{" "}
    //                 <TiArrowSortedDown className={style.navIconUp} />
    //               </span>
    //             </Dropdown>
    //           </span>

    //         </>
    //       ) : (
    //         <Button
    //           onClick={() => {
    //             history.push("/");
    //             setTimeout(() => {
    //               window.location = href;
    //             }, 700);
    //           }}
    //           {...{
    //             key: label,
    //             color: "inherit",
    //             // href: href,
    //             // component: MeterialLink,
    //             className: menuButton,
    //           }}
    //         >
    //           {label}
    //         </Button>
    //       )}
    //     </>
    //   );
    // }
    return (
      <>
        <SelectOtherProps />
        {/* <div>
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="navItem">
                <Dropdown placement="bottom" overlay={<ProfileBar />}>
                  <span className="dropdownLink" href="/#">
                    My Profile
                    <TiArrowSortedDown className="navIconUp" />
                  </span>
                </Dropdown>
              </li>
              <li className="navItem">
                <Dropdown placement="bottom" overlay={<UserBar />}>
                  <span className="dropdownLink" href="/#">
                    Users
                    <TiArrowSortedDown className="navIconUp" />
                  </span>
                </Dropdown>
              </li>
              <li className="navItem">
                <Dropdown placement="bottom" overlay={<CreatorBar />}>
                  <span className="dropdownLink" href="/#">
                    Creators
                    <TiArrowSortedDown className="navIconUp" />
                  </span>
                </Dropdown>
              </li>
              <li className="navItem">
                <Dropdown placement="bottom" overlay={<BundleBar />}>
                  <span className="dropdownLink" href="/#">
                    Bundles
                    <TiArrowSortedDown className="navIconUp" />
                  </span>
                </Dropdown>
              </li>
              <li className="navItem">
                <Dropdown placement="bottom" overlay={<NftBar />}>
                  <span className="dropdownLink">
                    NFT
                    <TiArrowSortedDown className="navIconUp" />
                  </span>
                </Dropdown>
              </li>
              <li className="navItem metavers">
                <Link to="/metaverse">
                  <span className="dropdownLink">
                    Metavers
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div> */}
      </>
    );
  };

  return (
    <>
      <AppBar
        position={history.location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{ backgroundColor: "#2c0355 !important", border: "none", }}
      >
        <Box
          maxWidth={history.location.pathname !== "/" ? "lg" : "fixed"}
          className={containerHeight}
        >
          {mobileView ? displayMobile() : displayDesktop()}
        </Box>
      </AppBar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose1}
      >
        <MenuItem>
          <Link to="/profile"> {t('navBar.myProfile')}</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/user">{t('navBar.myNFT')}</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/resell-nft">{t('navBar.resellNft')}</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/create-nft">{t('navBar.createNFT')}</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/notification">{t('navBar.notification')}</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/search">{t('navBar.notification')}</Link>
        </MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        minWidth="md"
        fullWidths
        style={{ borderRadius: "15px" }}
        className={classes.dialogParent}
      >
        <DialogContent className={classes.dialogContainer}>
          {notify.length == 0 ? (
            <NoDataFound />
          ) : (
            <Box
              className=""
              style={{
                maxHeight: 450,
                overflowY: "auto",
              }}
            >
              {notify.map((data, i) => {
                return <NotificationCard data={data} index={i} key={i} />;
              })}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        minWidth="md"
        className={classes.dialogParent}
      >
        <DialogContent style={{ padding: "20px 50px" }} className={classes.dialogContainer}>
          <Box className={loginModal}>
            <Typography variant="h3" style={{ marginBottom: "12px", color: "#FFF" }}>
              {t('login.welcomeTo')}
            </Typography>
            <span style={{ fontSize: "17px", color: "#FFF!important", }}> {t('login.areyoua')}</span>
            <Box className={loginModalButtonBox} mt={1}>
              <Button
                variant="contained"
                className={classes.creatorOrSubBtn}
                fullWidth
                onClick={() => {
                  auth.logOut();
                  history.push("/login");
                }}
              >
                {t('login.creator')}
              </Button>
              <span style={{ fontSize: "17px", marginTop: "10px", color: "#FFF!important", }}>{t('login.or')}</span>
              <Button
                variant="contained"
                className={classes.creatorOrSubBtn}

                fullWidth
                onClick={() => history.push("/wallet-connect")}
              >
                {t('login.subscriber')}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isLogOutOpen}
        onClose={() => setIsLogoutOpen(false)}
        minWidth="md"
      >
        <DialogContent style={{ padding: "20px 50px" }}>
          <Box className={loginModal}>
            <Typography variant="h4" style={{ marginBottom: "12px" }}>
              {t('login.surelogout')}
            </Typography>
            <Box mt={1} display="flex">
              <Button
                variant="contained"
                size="small"
                color="secondary"
                className="widthsame ml-10"
                fullWidth
                onClick={() => setIsLogoutOpen(false)}
              >
                {t('login.no')}
              </Button>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                className="widthsame ml-10"
                fullWidth
                onClick={() => {
                  auth.logOut();
                  history.push("/login");
                }}
              >
                {t('login.yes')}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

import React, { useContext, useEffect } from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  makeStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import { isValidationEmail, isValidEmail } from "src/CommanFunction/Validation";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MuiAlert from "@material-ui/lab/Alert";
import { Loader } from "react-feather";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  LoginBox: {
    padding: "10px 0px",
    height: "100vh",
    background: "#efdff0",
  },
  container: {
    width: "500px",
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    borderRadius: "15px",
    margin: "10px auto",
    padding: "10px",
    // boxShadow: "5px 5px 15px #c100fb, -5px -5px 20px #22c37f",
  },
  connectBox: {
    display: "flex",
    justifyContent: " center",
    alignItems: "center",
    height: "50vh",
    "& h5": {
      fontSize: "20px",
      fontWeight: "500",
      color: "#000",
    },
    "& button": {
      height: "54.5px",
      width: "237.5px",
    },
  },
  modaltitel: {
    fontSize: "30px",
    fontWeight: "600",
    marginBottom: "10px",
    textAlign: "center",
    borderBottom: "solid 1px #5a4e4e",
    paddingBottom: "10px",
    color: "#FFF!important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  input_fild2: {
    width: "100%",
    color: "#afafaf",
    padding: "10px",
    border: "1px solid #FFF",
    borderRadius: "15px",
    "& svg": {
      color: "#792034",
    },
  },
  btnflex: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  labeltext: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#FFF",
    width: "100%",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    "& a": {
      fontWeight: "700",
      textDecoration: "underline",
      color: "#000",
    },
    "& label": {
      paddingTop: "0 !important",
      color: "#141518",
    },
  },
  btn: {
    display: "block",
    width: "50%",
    margin: "10px auto",
    borderRadius: "10px",
    textAlign: "center",
    color: "#fff",
    background: "linear-gradient(270deg, #c100fb, #22c37f)!important",
    "&:hover": {
      background: "linear-gradient(270deg, #ffd800, #cc00ff)!important",
      color: "#cdb88a"
    },
  },
  img: {
    width: "fit-content",
    margin: "10px auto",
    cursor: "pointer",
    display: "block",
    transition: "all .2s linear",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  forget: {
    color: "brown",
    cursor: "pointer",
    margin: "0px 30px",
    transition: "all .2s linear",
    "&:hover": {
      transform: "translateY(2px)",
    },
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Login() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [pass, setpass] = React.useState("");
  const [emailvalid, setemailvalid] = React.useState(false);
  const [email, setemail] = React.useState("");
  const [openBlock, setOpen1] = React.useState(false);
  const [passvalid, setpassvalid] = React.useState(false);
  const [show, setshow] = React.useState(false);
  const id = window.localStorage.getItem("userAddress");
  const [loader, setLoader] = React.useState(false);
  const [resetloader, setresetloader] = React.useState(false);
  const [termsPopUp, setTermsPopUp] = React.useState(false);
  useEffect(() => {
    if (user.userLoggedIn) {
      history.push("/");
    }
  }, [user.userLoggedIn]);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const [isSubmit, setIsSubmit] = React.useState(false);
  const [isSubmit1, setIsSubmit1] = React.useState(false);
  const [state, setState] = React.useState({
    gilad: true,
    jason: true,
    antoine: true,
    utsav: true,
  });
  const { gilad, jason, antoine, utsav } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  const forgot = () => {
    setIsSubmit(true);
    setresetloader(true);
    if (email !== "" && isValidEmail(email)) {
      axios({
        method: "POST",
        url: Apiconfigs.forgotpass,
        data: {
          email: email,
          type: "user",
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            toast.success("Email send successfuly!");
            setresetloader(false);
            handleClose1(false);
          } else {
            toast.error(res.data.responseMessage);
            setresetloader(false);
          }
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.responseMessage);
          } else {
            toast.error(err.message);
          }
          console.log(err.message);
          setresetloader(false);
        });
    } else {
      // toast.error("Invalid Email");
      setresetloader(false);
    }
  };
  const Login = async () => {
    setIsSubmit1(true);
    if (email !== "" && pass !== "" && isValidEmail(email)) {
      setLoader(true);
      try {
        const res = await axios({
          method: "POST",
          url: Apiconfigs.userlogin,
          data: {
            email: email,
            password: pass,
          },
        });
        if (res.data.statusCode === 200) {
          console.log(res);
          if (!res.data?.result?.isNewUser) {
            toast.info(
              `Welcome Back ${res.data?.result?.name
                ? res.data?.result?.name
                : res.data?.result?.userName
              }`
            );
          }
          user.updatetoken(res.data.result.token);
          history.push("/");
        } else {
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
      }
    } else {
      // toast.error("Input field can't be empty");
    }
    setLoader(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChange1 = (event) => {
    setState({
      ...state,
      gilad: event.target.checked,
      jason: event.target.checked,
      antoine: event.target.checked,
      utsav: event.target.checked,
    });
  };
  const something = (event) => {
    if (event.keyCode === 13) {
      Login();
    }
  };
  const [t, i18n] = useTranslation();
  return (
    <Box className={classes.LoginBox}>
      <Box className="leftimg">
        <div className="span1"></div>
        <div className="span2"></div>
        <div className="span3"></div>
      </Box>
      <Box className="rightimg">
        <div className="span1"></div>
        <div className="span2"></div>
        <div className="span3"></div>
      </Box>
      <Container maxWidth="lg" className={classes.container}>
        <img
          src="images/centerimg.png"
          onClick={() => history.push("/")}
          className={classes.img}
          alt=""
        />
        <Typography variant="h3" className={classes.modaltitel}>
          {t('login.pleaseLogin')}
        </Typography>
        <form onSubmit={Login}>
          <Grid container>
            <Grid item style={{ width: "100%" }}>
              <Box style={{ width: "100%" }}>
                <label className={classes.labeltext}>{t('login.email')}</label>
                <TextField
                  id="standard-basic"
                  error={emailvalid || (isSubmit1 && !isValidEmail(email))}
                  placeholder={email}
                  className={classes.input_fild2}
                  type="email"
                  helperText={
                    isSubmit1 && !isValidEmail(email) ? "Incorrect Email." : ""
                  }
                  onChange={(e) => setemail(e.target.value)}
                />
              </Box>
              <Box>
                <label className={classes.labeltext}>{t('login.pass')}</label>
                <TextField
                  id="standard-basic"
                  // onFocus={(e) => (e.target.placeholder = "")}
                  // onBlur={(e) =>
                  //   (e.target.placeholder =
                  //     "0x93c3a3cd2463963787391532d06859684bbc2fa2")
                  // }
                  type={show ? "text" : "password"}
                  error={passvalid}
                  helperText={
                    passvalid
                      ? "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                      : ""
                  }
                  onKeyDown={(e) => something(e)}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setshow(!show)}
                        >
                          {show ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setpass(e.target.value)}
                  className={classes.input_fild2}
                />
              </Box>
              <Box className={classes.btnflex} mt={5}>
                <Button
                  variant="contained"
                  className={classes.btn}
                  // component={Link}
                  // to="/create-account"
                  onClick={Login}
                  disabled={loader}
                >
                  {t('login.signIn')} {loader && <ButtonCircularProgress />}
                </Button>
                <Button
                  variant="contained"
                  className={classes.btn}
                  component={Link}
                  to="/create-account"
                >
                  {t('login.signUp')}
                </Button>
                &nbsp;&nbsp;
                {/* <Button
                  variant="contained"
                  size="large"
                  className="widthsame"
                  // className='widthsame ml-10'
                  // component={Link}
                  // to="/create-account"
                  onClick={() => history.push("/wallet-connect")}
                >
                  Connect wallet
                </Button> */}

                <div
                  className={classes.forget}
                  onClick={() => setOpen1(true)}
                >
                  {t('login.forgetPass')} &nbsp;
                </div>
                {/* {!loader ? (
                <Button
                  variant='contained'
                  size='large'
                  color='secondary'
                  className='widthsame ml-10'
                  // component={Link}
                  // to="/create-account"
                  onClick={Login}
                  disabled={loader}
                >
                  Signin
                </Button>
              ) : (
                <Button>
                  <CircularProgress />
                </Button>
              )} */}
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>

      <Dialog
        open={openBlock}
        TransitionComponent={Transition}
        keepMounted
        fullWidth="sm"
        maxWidth="sm"
        onClose={handleClose1}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <img src="images/centerimg.png" className="centerimg" alt="" />

            <Box mt={3}>
              <Typography
                variant="h6"
                style={{ color: "#792034", marginBottom: "5px" }}
              >
                {t('login.forgetPass')}
              </Typography>
              <Typography
                variant="body"
                component="p"
                style={{ fontSize: "14px" }}
              >
                {t('login.forResetPass')}
              </Typography>
            </Box>

            <Box>
              <label className={classes.labeltext}>  {t('login.email')}</label>
              <TextField
                id="standard-basic"
                error={emailvalid || (isSubmit && !isValidEmail(email))}
                placeholder={email}
                className={classes.input_fild2}
                type="email"
                helperText={
                  isSubmit && !isValidEmail(email) ? "Incorrect Email." : ""
                }
                onChange={(e) => setemail(e.target.value)}
              />
            </Box>
            <Box mt={2} mb={8} pb={3} className={classes.btnBox}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className="btn-block "
                //   component={Link}
                //   to="/home"
                onClick={forgot}
                disabled={resetloader}
              >
                {t('login.continue')}{resetloader && <ButtonCircularProgress />}
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={termsPopUp}
        keepMounted
        fullWidth="sm"
        maxWidth="sm"
        onClose={() => setTermsPopUp(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <img src="images/centerimg.png" className="centerimg" />

            <Box>
              <Typography
                variant="h6"
                style={{ color: "#792034", marginBottom: "10px" }}
              >
                {t('login.LastStep')}
              </Typography>
              <Typography
                variant="body"
                component="p"
                align="center"
                style={{ fontSize: "14px" }}
              >
                {t('login.agree')}{" "}
              </Typography>
            </Box>
            <Box className={classes.paper} mt={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gilad}
                    onChange={handleChange}
                    name="gilad"
                  />
                }
              />
              <label>
                {t('login.agreed')} <Link>{t('login.terms')} </Link>
              </label>
            </Box>
            <Box className={classes.paper}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={utsav}
                    onChange={handleChange}
                    name="utsav"
                  />
                }
              />
              <label>
                {t('login.agreed')} <Link>{t('login.privacy')}</Link>
              </label>
            </Box>
            <Box className={classes.paper}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jason}
                    onChange={handleChange}
                    name="jason"
                  />
                }
              />
              <label>
                {t('login.agreed')} <Link> {t('login.risk')}</Link>
              </label>
            </Box>
            <Box className={classes.paper}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={antoine}
                    onChange={handleChange}
                    name="antoine"
                  />
                }
              />
              <label>
                {t('login.agreed')}  <Link> {t('login.kyc')} </Link>
              </label>
            </Box>
            <Box className={classes.paper} mt={5}>
              <FormControlLabel
                control={<Checkbox onChange={handleChange1} name="gilad" />}
              />
              <label>    {t('login.readandagree')}</label>
            </Box>

            <Box mt={2} mb={5} pb={3} className={classes.btnBox}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className="btn-block "
              //   component={Link}
              //   to="/home"
              >
                {t('login.continue')}
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

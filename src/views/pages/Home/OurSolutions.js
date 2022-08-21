import React from 'react'
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  mainSection: {
    overflow: "hidden",
    zIndex: "99999",
    padding: '15px 0px',
    background: "#441682",
    // backgroundImage: "url('./images/one cikan.png')",
    // backgroundClip: "padding-box",
    // position: "relative",
  },
  svg: {
    position: "absolute",
    zIndex: "0",
    top: "0",
  },

  leftSection: {
    color: '#000',
    marginTop: '42px',
    marginBottom: '40px',
    '& h2': {
      fontSize: '48px',
      fontWeight: '600',
      letterSpacing: '4px',
      marginBottom: '60px',
      '@media(max-width:767px)': {
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '38px',
        letterSpacing: '4px',
      },
    },
    '& h4': {
      margin: '15px 0px',
      fontSize: '15px',
      fontWeight: '300',
      lineHeight: '28px',
      letterSpacing: '2px',
      marginTop: '-35px',
      '@media(max-width:767px)': {
        margin: '0px 0px',
        marginTop: '-35px',
        fontWeight: '300',
        lineHeight: '25px',
        letterSpacing: '2px',
      },
    },
    '& h5': {
      fontSize: '15px',
      fontWeight: '300',
      lineHeight: '28px',
      letterSpacing: '2px',
      wordBreak: "break-word",
      color: "#e9e6e6",
      transition: "all .2s linear",
      "&:hover": {
        transform: "scale(1.02)",
      },
      '@media(max-width:767px)': {
        textALign: "center!important",
        fontWeight: '300',
        lineHeight: '25px',
        letterSpacing: '2px',
      },
    },
  },

  rightSection: {

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '50px',
    '& img': {
      width: '100%',
      height: '480px',
      transition: ".2s",
      "&:hover": {
        transform: "scale(1.06)",
      }
    },
  },
  imgTextBox: {
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    width: "90%",
    margin: "20px 0",
    transition: "all .1s linear",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  boxImg: {
    width: "fit-content",
    margin: "-5px 20px 0",
  },
  textBox: {
    flex: "1",
    marginLeft: "10px"
  },
  title: {
    color: "#FFF",
    userSelect: "none",
    transition: "all .1s linear",
    "&:hover": {
      color: "#9037a7!important",
    },
    '@media(max-width:991px)': {
      textALign: "center",
      width: "fit-content",
      margin: "auto",
    },
  },

  textTitle: {
    color: "#FFF",
    margin: "10px auto",
    fontWeight: "500",
  },
  text: {
    color: "#FFF",
    margin: "10px auto",
  },
}))
export default function OurSolutions({ auth, ourSolutions }) {
  const classes = useStyles()
  return (
    <Box className={classes.mainSection}>
      {/* <img className={classes.svg} src={`./images/hero-background.png`} /> */}
      <Container>
        <Grid container alignItems style={{ position: "relative", zIndex: "9999" }}>
          <Grid item lg={6} xs={12}>
            {/* Start Texts */}
            <Box className={classes.leftSection}>
              <Typography variant="h2" className={classes.title} >
                {ourSolutions?.title}
              </Typography>
              <Typography variant="h5" className={classes.text} >
                {ourSolutions?.description}
              </Typography>
              {/* Start  I Added This Ready Cards */}
              {/* <Box className={classes.imgTextBox} >
                <Box className={classes.boxImg} >
                  <img src="./images/para birimi.png" />
                </Box>
                <Box className={classes.textBox}>
                  <Typography variant="h3" className={classes.textTitle}>
                    Money Exchange
                  </Typography>
                  <Typography variant="h5" className={classes.text}>
                    Perform your transactions in a reliable and fast way. Earn gifts from your transactions
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.imgTextBox} >
                <Box className={classes.boxImg} >
                  <img src="./images/transfer.png" />
                </Box>
                <Box className={classes.textBox}>
                  <Typography variant="h3" className={classes.textTitle}>
                    Balance Transfer
                  </Typography>
                  <Typography variant="h5" className={classes.text}>
                    Perform your transactions in a reliable and fast way. Earn gifts from your transactions
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.imgTextBox} >
                <Box className={classes.boxImg} >
                  <img src="./images/sakla.png" />
                </Box>
                <Box className={classes.textBox}>
                  <Typography variant="h3" className={classes.textTitle}>
                    Safe Transfer
                  </Typography>
                  <Typography variant="h5" className={classes.text}>
                    Perform your transactions in a reliable and fast way. Earn gifts from your transactions
                  </Typography>
                </Box>
              </Box> */}
              {/* <Typography variant="h5" className="seats">
                {ourSolutions?.description}
              </Typography> */}
              {/* <Typography variant="h5">
                Unlike generic crowdfunding platforms, the MAS platform will
                enable and faster close and personal relationship.
              </Typography> */}
              {/* End  I Added This Ready Cards */}
            </Box>
            {/* End Texts */}
          </Grid>
          <Grid item lg={6} xs={12}>
            <Box className={classes.rightSection}>
              <img
                src={
                  ourSolutions?.contentFile
                    ? ourSolutions?.contentFile
                    : 'images/home/banner1.png'
                }
                alt="image loading..."
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

import React, { useContext } from 'react'
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { Bold } from 'react-feather'
import Slider from 'react-slick'
import { useTranslation } from "react-i18next";
import Story from "../../../component/Story";

const useStyles = makeStyles((theme) => ({
  bannerSectionBody: {
    padding: '100px 0px 0px',
    // backgroundImage: 'linear-gradient(45deg, #240b36 30%, #c31432 90%)',
    // backgroundImage: 'url(/images/BannerImg.png)',
    width: '100%',
    // background: "#141518",
    overflow: "hidden",
  },
  bannerSectionBodyNew: {
    overflow: "hidden",
    padding: '100px 0px 0px',
    // backgroundImage: "url('./images/header.jpg')",
    width: '100%',
    position: "relative",
    marginBottom: "50px",
  },
  // text: {
  //   display: "flex",
  // },
  leftSection: {
    padding: '0px 0px',
    fontFamily: 'Poppins sans-serif',
    '@media(max-width:667px)': {
      marginTop: '51px',
    },

    '& h1': {
      fontSize: '60px',
      fontWeight: '800',
      fontFamily: 'Poppins sans-serif',
      lineHeight: '70px',
      letterSpacing: '10px',
      color: '#d0dfde',

      '@media(max-width:1156px)': {
        fontSize: '50px',
        lineHeight: '65px',
      },
      '@media(max-width:667px)': {
        fontSize: '40px',
        lineHeight: '55px',
      },
      '@media(max-width:450px)': {
        fontSize: '35px',
        lineHeight: '45px',
      },
    },
    '& h2': {
      fontSize: '48px',
      fontWeight: '600',
      lineHeight: '60px',
      fontFamily: 'Poppins sans-serif',
      letterSpacing: '2px',
      //   color: "#fc424d",
      color: '#d0dfde',
      '@media(max-width:1156px)': {
        fontSize: '38px',
        lineHeight: '52px',
      },
      '@media(max-width:667px)': {
        fontSize: '26px',
        lineHeight: '42px',
      },
      '@media(max-width:450px)': {
        fontSize: '24px',
        lineHeight: '38px',
      },
    },
    '& h3': {
      fontSize: '26px',
      fontWeight: '350',
      lineHeight: '48px',
      fontFamily: 'Poppins sans-serif',
      letterSpacing: '2px',
      color: '#d0dfde',
      textAlign: 'center',
      '@media(max-width:1156px)': {
        fontSize: '20px',
        lineHeight: '36px',
      },
      '@media(max-width:667px)': {
        fontSize: '17px',
        lineHeight: '32px',
      },
    },
    '& h4': {
      margin: '26px 0px',
      fontSize: '16px',
      fontWeight: '300',
      lineHeight: '28px',
      fontFamily: 'Poppins sans-serif',
      letterSpacing: '2px',
      color: '#d0dfde',
    },
    '& button': {
      borderRadius: '30px',
      background: '#fc424d',
      fontFamily: 'Poppins sans-serif',
      color: '#d0dfde',
      padding: '8px 14px',
    },
  },
  rightSection: {
    '& img': {
      width: '100%',
      minHeight: '300px',
      borderRadius: '10px',
    },
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '15px',
    width: '100%',
    height: '5vh',
    marginBottom: "10px",
  },
  imgsec: {
    position: 'absolute',
    right: '-15px',
    bottom: '57px',
    width: '95px',
    '@media(max-width:768px)': {
      right: '-17px',
      bottom: '49px',
      width: '87px',
    },
    // '@media(max-width:667px)': {
    //   right: '-14px',
    //   bottom: '42px',
    //   width: '79px',
    // },
    // '@media(max-width:450px)': {
    //   right: '-13px',
    //   bottom: '35px',
    //   width: '71px',
    // },
  },
  clickToWinBtn: {
    color: '#d0dfde',
    borderColor: 'd0dfde',
    borderRadius: '25px',
    border: '4px solid #d0dfde',
    fontSize: '25px',
    height: '50px',
    marginBottom: "10px",
    "&:hover": {
      background: "#FFF",
      color: '#46026b',
    },
  },
  arParent: {
    position: "relative",
    zIndex: "999",
    marginBottom: "80px",

  },
  enParent: {
    position: "relative",
    zIndex: "999",
    marginBottom: "80px",
    "@media(min-width: 600px)": {
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  },
  storyBox: {
    position: "absolute",
    top: '10px',
    left: "10px",
  },
  storyPerent: {
    marginTop: "-20px",
    marginBottom: "20px",
    overflow: "visible",
  },
}))

export default function BannerSection({ auth, bannerDetails, bannerVideo }) {
  const [t, i18n] = useTranslation();
  const history = useHistory()
  const location = useLocation()
  const settings = {
    centerMode: true,
    // centerPadding: '80px',
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    focusOnSelect: true,
    infinite: true,
    arrows: false,
    dots: false,
    fade: true,
    speed: 500,
    centerPadding: '0px',
    className: 'slides',

    // responsive: [
    //   {
    //     breakpoint: 1025,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 800,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 450,
    //     settings: {
    //       slidesToShow: 1,
    //       centerPadding: '30px',
    //     },
    //   },
    // ],
  }
  const settings2 = {
    dots: false,
    // fade: true,
    infinite: true,
    speed: 500,
    centerPadding: '0px',
    slidesToShow: 1,
    className: 'slides',
    arrow: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
  }
  const classes = useStyles()
  return (
    <>
      <Slider {...settings2}>
        {bannerDetails &&
          bannerDetails?.map((data, i) => {
            return (
              <Box
                key={i}
                className={classes.bannerSectionBody}
                style={{
                  // backgroundImage: 'url(' + data?.image + ')',
                  // backgroundImage: 'url(/images/BannerImg.png) !important',
                  // backgroundColor: 'red',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  position: "relative",
                }}
              >
                {data?.mediaType === 'video' ? (
                  <video
                    controls="false"
                    autoPlay="true"
                    loop
                    muted
                    playsinline="true"
                    width="100%"
                    className="banerbg"
                  >
                    <source src={data?.image} type="video/mp4" />
                  </video>
                ) : (
                  <img className="banerbg" src={data?.image} alt="" />
                )}
                <Container maxWidth="lg">
                  <Grid container spacing={5} alignItems>
                    <Grid item lg={6} sm={12} md={6} xs={12}>
                      <Box className={classes.leftSection}>
                        <Box style={{ position: 'relative' }}>
                          <img
                            className={classes.imgsec}
                            src="/images/bannerFont.png"
                            alt=""
                          />
                          <Typography
                            variant="h1"
                            style={{ textAlign: 'right', marginTop: '34px' }}
                            className="seats"
                          >
                            {data?.title}
                          </Typography>
                        </Box>

                        <Typography
                          variant="h3"
                          className={`${classes.text} seats`}
                        >
                          {data?.description}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6} sm={12} md={6} xs={12}>
                      <Slider {...settings} className="width100">
                        {bannerVideo &&
                          bannerVideo.map((data, i) => {
                            return (
                              <Box className={classes.rightSection} key={i}>
                                {/* <img src="images/feed1.png" alt="" /> */}
                                <video
                                  className="videoBg"
                                  autoPlay
                                  muted
                                  loop
                                  width="100%"
                                  style={{ borderRadius: '20px' }}
                                // width={300}
                                // height={300}
                                >
                                  <source
                                    src={
                                      data?.video
                                        ? data?.video
                                        : '/video/MASpresentation.mp4'
                                    }
                                    type="video/mp4"
                                  />
                                </video>
                              </Box>
                            )
                          })}
                      </Slider>

                      <Box
                        className={classes.btn}
                        style={{ paddingBottom: '20px' }}
                      >
                        {!auth.userLoggedIn ? (
                          <Button
                            variant="outlined"
                            classname={classes.clickToWinBtn}
                            onClick={() => {
                              auth.logOut()
                              history.push('/login')
                            }}
                          >
                            {t('header.clickTo')}
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            className={classes.clickToWinBtn}
                          >
                            {t('header.clickTo')}
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            )
          })}
      </Slider>
      {bannerDetails && bannerDetails?.length === 0 && (
        <Box className={classes.bannerSectionBodyNew}>
          {/* <img src={`./images/hero-background.png`}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "-1",
            }} /> */}
          <Container maxWidth="lg" className={i18n.language == "ar" ? classes.arParent : classes.enParent}>

            <Grid container alignItems>
              {/* Start Texts  */}
              <Grid item lg={6} sm={12} md={6} xs={12} >
                <Grid container xs={12} className={classes.storyPerent} >
                  <Slider className="width100" >
                    {/* {userListToDisplay.map((data, i) => { */}
                    {/* return ( */}
                    <Story
                    // key={i}
                    // data={data}
                    // indaex={i}
                    // callbackFn={getuser}
                    />
                    {/* ); */}
                    {/* })}{" "} */}
                  </Slider>
                </Grid>
                <Box className={classes.leftSection}>



                  <Typography variant="h2"
                    style={i18n.language == "ar" ? ({ textAlign: 'right' }) : ({ textAlign: 'left' })}>
                    {t('header.youAre')}
                    {i18n.language == "ar" && (<span> {t('header.theTalent')}</span>)}
                  </Typography>
                  <Box style={{ position: 'relative' }}>
                    {i18n.language == "en" && (
                      <Typography
                        variant="h1"
                        className=""
                        style={{ textAlign: 'right' }}>
                        {t('header.theTalent')}
                      </Typography>)}
                    <img
                      className={classes.imgsec}
                      src="/images/bannerFont.png"
                      alt=""
                    />
                  </Box>

                  <Typography variant="h3" className={classes.text}
                    style={{ lineHeight: "70px" }} >
                    {t('header.firstText')} <strong> {t('header.secoundText')}</strong> {t('header.thirdText')}
                  </Typography>
                  <Typography variant="h3" className={classes.text}
                    style={{ lineHeight: "70px" }} >
                    {t('header.FourthText')}
                  </Typography>
                  <Typography variant="h3" className={classes.text}
                    style={{ lineHeight: "70px" }} >
                    {t('header.fifithText')}
                  </Typography>
                </Box>
              </Grid>
              {/* End Texts  */}

              {/* Start vidoe And Click To Win */}
              <Grid item lg={6} sm={12} md={6} xs={12}>
                <Slider {...settings} className="width100">
                  {bannerVideo &&
                    bannerVideo.map((data, i) => {
                      return (
                        <Box className={classes.rightSection} key={i}>
                          {/* <img src="images/feed1.png" alt="" /> */}
                          <video
                            className="videoBg"
                            autoPlay
                            muted
                            loop
                            width="100%"
                            style={{ borderRadius: '20px' }}
                          // width={300}
                          // height={300}
                          >
                            <source
                              src={
                                data?.video
                                  ? data?.video
                                  : '/video/MASpresentation.mp4'
                              }
                              type="video/mp4"
                            />
                          </video>
                        </Box>
                      )
                    })}
                </Slider>

                <Box className={classes.btn} style={{ paddingBottom: '20px' }}>
                  {!auth.userLoggedIn ? (
                    <Button
                      variant="outlined"
                      className={classes.clickToWinBtn}
                      onClick={() => {
                        auth.logOut()
                        history.push('/login')
                      }}
                    >
                      {t('header.clickTo')}
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      className={classes.clickToWinBtn}
                    >
                      {t('header.clickTo')}
                    </Button>
                  )}
                </Box>
              </Grid>
              {/* End vidoe And Click To Win */}

            </Grid>
          </Container>
        </Box>
      )}
    </>
  )
}

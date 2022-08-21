import React from 'react'
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core'
import HomeCard from 'src/component/HomeCard'
import { useTranslation } from "react-i18next";
const cardData = [
  {
    head: 'Bundles',
    description:
      "MAS setup with 'bundles' specific prices and benefits and clients will be able to purchase those bundles",
  },
  {
    head: 'Generic Donations',
    description:
      'Clients can also make generic donations to MAS, in order to support all their projects and activites',
  },
  {
    head: 'NFT auctions',
    description:
      'Clients will be able to buy NFT auctions of their desired MAS',
  },
]

const useStyles = makeStyles((theme) => ({
  mainSection: {
    padding: '30px 0px',
    background: "#441682",
    position: "relative",
    zIndex: "999",
    marginTop: "40px",
    // backgroundImage: "url('./images/one cikan.png')",
    // backgroundClip: "padding-box",

  },
  titles: {
    userSelect: "none",
    color: "#EEE",
    "&:hover": {
      color: "#9037a7"
    },
    "& span": {
      color: "#9037a7",
      display: "inline-block",
      transition: "all .1s linear",
      "&:hover": {
        transform: "scale(1.1)",
      }
    },
    '@media(max-width:991px)': {
      width: "fit-content",
      margin: "auto",
    },
  },
  titlesAr: {
    userSelect: "none",
    color: "#EEE",
    textAlign: "center!important",
    "&:hover": {
      color: "#9037a7"
    },
    "@media(max-width: 991px)": {
      textALign: "right",
    },
    "& span": {
      color: "#9037a7",
      display: "inline-block",
      transition: "all .1s linear",
      "&:hover": {
        transform: "scale(1.1)",
      }
    },
    '@media(max-width:991px)': {
      width: "fit-content",
      margin: "auto",
    },
  },
  rightSection: {
    color: '#d0dfde',
    '& h2': {
      fontSize: '48px',
      fontWeight: '600',
      letterSpacing: '4px',
      marginBottom: '60px',
      '@media(max-width:767px)': {
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '0px',
        letterSpacing: '3px',
      },
    },
    '& h4': {
      margin: '30px 0px',
      fontSize: '15px',
      fontWeight: '300',
      lineHeight: '28px',
      letterSpacing: '2px',
      '@media(max-width:767px)': {
        fontSize: '10px',
        fontWeight: '300',
        margin: '0px 0px',
        lineHeight: '23px',
        letterSpacing: '2px',
      },
    },
  },
  leftSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: "all .2s linear",
    position: "relative",
    zIndex: "9999",
    '& img': {
      width: '100%',
      maxWidth: '450px',
    },
    "&:hover": {
      transform: "scale(1.1)",
    }
  },
  deciration: {
    color: "#EEE",
  },
}))
export default function HowItWorks({ auth, howItWorksData }) {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  return (
    <Box className={classes.mainSection}>
      <Container>
        <Grid container spacing={3} alignItems>
          {/* Start Img Section */}
          <Grid item lg={6} xs={12}>
            <Box className={classes.leftSection}>
              <img
                src={
                  howItWorksData?.contentFile
                    ? howItWorksData?.contentFile
                    : 'images/home/banner2.png'
                }
                alt="error loading..."
              />
            </Box>
          </Grid>
          {/* End Img Section */}

          {/* Start Cards */}
          <Grid item lg={6} xs={12}>
            {/* Start Container */}
            <Box className={classes.rightSection}>
              {/* Start Title */}
              <Typography variant="h2" className={i18n.language == "ar" ? (classes.titlesAr) : (classes.titles)}>
                {i18n.language == "ar" ?
                  (<> <span>{t("howItWork.works")}</span>{t("howItWork.howIt")}</>)
                  :
                  (<>{t("howItWork.howIt")} <span>{t("howItWork.works")}</span></>)
                }
              </Typography>
              {/* End Title */}

              {/* Start Card`s Title */}
              <Typography variant="h4" className={classes.deciration}>
                {howItWorksData?.description}
                With the online text generator you can process your personal Lorem Ipsum enriching it with html elements that define
                its structure, with the possibility to insert external links, but not only
                Now to compose a text Lorem Ipsum is much more fun!
                In fact inserting any fantasy text or a famous text, be it a poem, a speech,
                a literary passage, a songs text, etc., our text generator will provide the
                random extraction of terms and steps to compose your own exclusive Lorem Ipsum.
              </Typography>
              {/* End Card`s Title */}

              {/* Start Description */}
              <Box className={classes.cardSection}>
                {howItWorksData?.contents &&
                  howItWorksData?.contents.map((data, i) => {
                    return <HomeCard data={data} index={i} key={i} />
                  })}
              </Box>
              {/* End Description */}

            </Box>
            {/* End Container */}

          </Grid>
          {/* End Cards */}
        </Grid>
      </Container>
    </Box>
  )
}

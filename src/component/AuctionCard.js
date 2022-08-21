import React from "react";
import { useTranslation } from "react-i18next";

import { Typography, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  LoginBox: {
    position: "relative",
    height: "300px",
    width: "100%",
    "& img": {
      width: "100%",
      height: "100%",
    },
    "& p": {
      fontSize: "12px",
      position: "absolute",
      bottom: "5px",
      textAlign: "center",
      left: "50%",
      transform: "translateX(-50%)",
      width: "90%",
      backgroundColor: "#fff",
      padding: " 5px",
    },
  },
}));

const AuctionCard = () => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  return (
    <>
      <Box className={classes.LoginBox}>
        <img src="images/images-1.jpg" alt="" />
        <Typography variant="body2" component="p">
          {t("auctions.endsIn")} 10 {t("auctions.days")} 4 {t("auctions.hours")} 36 {t("auctions.minutes")} 44 {t("auctions.seconds")}
        </Typography>
      </Box>
    </>
  );
};

export default AuctionCard;

import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Grid,
  Input,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  Checkbox,
  Link,
  OutlinedInput,
  InputAdornment,
  DialogTitle,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Link as RouterLink } from "react-router-dom";
import Page from "src/component/Page";
import FlagIcon from "@material-ui/icons/Flag";
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  input_fild22: {
    width: "100%",
    "& input": {
      height: "45px",
      border: 0,
    },
    "& .MuiInput-underline:before": {
      border: 0,
    },
  },
  dlflex: {
    "& div": {
      marginTop: "2rem",
      "& span": {
        border: "1px solid #e8e7e7",
        fontSize: "20px",
        padding: "7px",
        marginRight: "6px",
      },
    },
  },
  PhotoBox: {
    "& img": {
      maxWidth: "100%",
      borderRadius: "15px",
    },
  },
  flexPrice: {
    display: "flex",
    alignItems: "center",
    color: "#f5f5f5",
    fontSize: "18px",
  },
  dailogTitle: {
    textAlign: "Center",
    "& h2": {
      color: "#141518",
      fontSize: "23px",
    },
  },
  UploadBox: {
    border: "solid 0.5px #707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "110px",
  },
  bundleText: {
    "& .red": {
      color: "#792034",
    },
    "& h4": {
      color: "#141518",
      fontSize: "20px",
    },
  },
  tokenList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "7px",
    border: "solid 0.5px #e5e3dd;",
    "&:hover": {
      backgroundColor: "rgba(209, 91, 91, 0.39)",
    },
    "& h3": {
      color: "#141518",
      fontSize: "14px",
    },
  },
  deskiText: {
    "& h4": {
      marginBottom: "10px",
      color: "#707070",
      fontSize: "20px",
      "& span": {
        color: "#141518",
      },
    },
  },
}));

export default function Modal() {
  const [t, i18n] = useTranslation();
  const classes = useStyles();
  const [OpenAuction, setOpenAuction] = useState(false);
  const [OpenBundle, setOpenBundle] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [policy, setPolicy] = useState(false);

  return (
    <Page title="NFT Details">
      <Container>
        <Box mt={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenAuction(true)}
          >
            {t("auctions.auction")}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenBundle(true)}
          >
            {t("auctions.basicBundle")}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenBuy(true)}
          >
            {t("auctions.buyNow")}
          </Button>
        </Box>
        {OpenAuction && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={OpenAuction}
            onClose={() => setOpenAuction(false)}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle className={classes.dailogTitle}>
              {t("auctions.makeNewAuction")}
            </DialogTitle>
            <DialogContent>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <label> {t("auctions.MASHeld")}</label>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      id="standard-basic"
                      placeholder=""
                      className={classes.input_fild2}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={12}>
                    <label>{t("auctions.uploadPhotoOrVideo")}</label>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box className={classes.UploadBox}>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file"
                        multiple
                        type="file"
                      />
                      <label htmlFor="raised-button-file">
                        <Button
                          variant="text"
                          color="primary"
                          endIcon={<CloudUploadIcon />}
                        >
                          {t("auctions.upload")}
                        </Button>
                      </label>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={12}>
                    <label>{t("auctions.details")}</label>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box className={classes.UploadBox}>
                      <TextField
                        id="standard-basic"
                        placeholder=""
                        className={classes.input_fild22}
                        multiline
                        maxRows={4}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={4}>
                    <label>{t("auctions.time")}</label>
                  </Grid>
                  <Grid item xs={12} md={8} className={classes.dlflex}>
                    <Box className={classes.timings}>
                      <span>{t("auctions.days10")}</span>
                      <span>23</span>
                      <span>00</span>
                      <span>40</span>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={4}>
                    <label>starting bid:</label>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Input
                      placeholder=""
                      className={classes.input_fild2}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          {t("auctions.selectAToken")}
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => setOpenAuction(false)}
                color="primary"
                size="large"
              >
                {t("auctions.cancel")}
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenAuction(false)}
                color="secondary"
                size="large"
              >

                {t("auctions.placeAuction")}
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {OpenBundle && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={OpenBundle}
            onClose={() => setOpenBundle(false)}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogContent>
              <Box className={classes.PhotoBox}>
                <img src="/images/Profilebg.png" alt="" />
              </Box>
              <Box mt={3} className={classes.bundleText} textAlign="center">
                <Typography variant="h4" className="red">
                  {t("auctions.bundle")}
                </Typography>
                <Typography variant="h4">
                  {t("auctions.theBasicBundle")}</Typography>
              </Box>

              <Box mt={2} className={classes.deskiText}>
                <Typography variant="h4" align="left" color="textSecondary">
                  {t("auctions.donationAmount")} <span>15 MAS</span>
                </Typography>
                <Typography variant="h4" align="left" color="textSecondary">
                  {t("auctions.duration")}  <span>{t("auctions.month1")}</span>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} lg={2}>
                    <Typography variant="h4" align="left" color="textSecondary">
                      {t("auctions.details")}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9} lg={10}>
                    <Typography
                      variant="body2"
                      align="left"
                      color="textSecondary"
                    >
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd gubergren, no sea takimata
                      sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
                      sit amet, consetetur sadipscing elitr, sed diam nonumy
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={3} mb={3} textAlign="center">
                <Button variant="contained" color="secondary" size="large">
                  {t("auctions.subscribeNow")}
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        )}
        {openBuy && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={openBuy}
            onClose={() => setOpenBuy(false)}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogContent>
              <DialogTitle className={classes.dailogTitle}>
                {t("auctions.selectAToken")}
              </DialogTitle>
              <Box mt={3} className={classes.tokenList}>
                <Typography variant="h3" className="red">
                  $ MAS
                </Typography>
                <img src="/images/tokens/1.png" alt="coin" />
              </Box>
              <Box mt={2} className={classes.tokenList}>
                <Typography variant="h3" className="red">
                  $ MAS
                </Typography>
                <img src="/images/tokens/1.png" alt="coin" />
              </Box>
              <Box mt={2} className={classes.tokenList}>
                <Typography variant="h3" className="red">
                  $ MAS
                </Typography>
                <img src="/images/tokens/1.png" alt="coin" />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenBuy(false)}
                size="large"
              >
                {t("auctions.cencel")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenBuy(false)}
                size="large"
              >
                {t("auctions.apply")}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </Page>
  );
}

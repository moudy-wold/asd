import React from 'react';
import {
    Container,
    Box,
    Typography,
    makeStyles,
    Grid,
} from "@material-ui/core";
import { Collapse } from 'antd';
import 'antd/dist/antd.css';
import { useTranslation } from "react-i18next";
export default function Faq() {
    const { Panel } = Collapse;
    const [t, i18n] = useTranslation();
    const useStyles = makeStyles((theme) => ({
        main: {
            width: "100%",
            padding: "50px 100px",
            textAlign: "center",
            backgroundColor: "#441682",
            marginTop: "-50px",
            position: "relative",
            zIndex: "9999",
        },
        logo: {
            width: "fit-content",
            padding: " 15px 20px 10px",
            textAlign: "center",
            margin: "15px auto",
            borderRadius: "10px",
            background: "#351186",
            transition: "all .2s linear",
            "&:hover": {
                transform: "scale(1.2)"
            },
            "& svg": {
                color: "#37a3fe",
                fontSize: "20px",
            },
        },
        title: {
            width: "fit-content",
            padding: "10px",
            height: "48px",
            margin: "10px auto",
            textAlign: "center",
            color: "#FFF",
            fontWeight: "600",
            transition: "all .3s linear",
            userSelect: "none",
            "&:hover": {
                border: "1px solid #FFF",
                borderRadius: "20px",
            },
        },
        text: {
            fontWeight: "300",
            color: "#FFF!important",
            fontSize: "18px",
            "@media(max-width:667px)": {
                marginTop: "66px",
            },
        },
        mai: {
            width: '42%',
            // marginRight: "60px",
            margin: "10px auto",
            "& div": {
                border: "none",
                transition: "all .2s linear",
                "&:hover": {
                    transform: "scale(1.05)",
                },
            },
        },
        questionParent: {
            background: "transparent !important",
            margin: "10px auto",
        },
        question: {
            backgroundColor: "transparent !important",
            borderBottom: "2px solid #3280c3 !important",
            padding: " auto 5px",
            "& p": {
                fontSize: "18px",
                padding: "0px!important",

            },
            "&>div>span": {
                color: "#FFF!important",
                background: "transparent !important",
                fontSize: "20px",

            },
            "&>div>div": {
                color: "#FFF!important",
                marginTop: "10px",
                "& svg": {
                    fontSize: "20px",
                },
            },
            "& div": {
                background: "transparent !important",
            },
            "&:last-child(div)": {
                background: "transparent !important",
                padding: "0px !important",
            },
        },
        img: {
            width: "100%",
            height: "100%",
            transition: "all .2s linear",
            transform: "scale(0.8)",
            "&:hover": {
                transform: "scale(0.85)",
            },
        },
    }))
    const classes = useStyles();
    return (
        <Box className={classes.main}>

            {/* Start Header */}
            <div className={classes.logo}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="HeaderTag_tagIcon__27TxU" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z"></path></svg>
            </div>
            <Typography
                variant="h3"
                className={classes.title}>
                {t('faq.questions')}
            </Typography>
            <p className={classes.text}>{t('faq.title')}</p>
            {/* End Header */}

            {/* Start Container */}
            <Grid container style={{ display: "flex", justifyContent: "space-between" }}>

                {/* Start Img */}
                <Box item xs={12} lg={6} style={{ margin: "10px auto" }}>
                    <img src={`./images/faq.png`} className={classes.img} />
                </Box>
                {/* End Img */}
                {/* Start question */}
                <Grid item xs={12} lg={6} className={classes.mai}  >
                    <Collapse className={classes.questionParent} defaultActiveKey={['1']} >
                        <Panel header={t('faq.que1')} key="1" className={classes.question}>
                            <p>{t('faq.ans1')}</p>
                        </Panel>
                        <Panel header={t('faq.que2')} key="2" className={classes.question}>
                            <p>{t('faq.ans2')}</p>
                        </Panel>
                        <Panel header={t('faq.que3')} key="3" className={classes.question}>
                            <p>{t('faq.ans3')}</p>
                        </Panel>
                        <Panel header={t('faq.que4')} key="4" className={classes.question}>
                            <p>{t('faq.ans4')}</p>
                        </Panel>
                        <Panel header={t('faq.que5')} key="5" className={classes.question}>
                            <p>{t('faq.ans5')}</p>
                        </Panel>
                    </Collapse>
                </Grid>
                {/* End Question */}

            </Grid>
            {/* End Container */}
        </Box>
    )
}

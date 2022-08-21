import React from 'react';
import i18next from "i18next";
import { makeStyles } from "@material-ui/core";
import { BsCheckLg } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    ul: {
        width: "100%",
        backgroundColor: "#FFF",
    },
    li: {
        padding: "10px",
        color: "#FFF",
        cursor: "pointer",
        marginTop: "5px",
        bordrBottom: "1px solid #504b4bd9",
        transiiton: "all .2s linear",
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
            transform: "scale(1.1)",
        },
        "& svg": {
            marginLeft: "15px",
            color: "rebeccapurple",
        },
    },
}))
export default function Landuage() {
    const [lang, setLang] = React.useState();
    const classes = useStyles();

    React.useEffect(() => {
        const value = `; ${document.cookie}`;
        const parts = value.split("i18next=");
        if (parts.length === 2) {
            setLang(parts.pop().split(";").shift());
        }
    }, []);

    const handleChange = (value) => {
        setLang(value);

        i18next.changeLanguage(value);
    };
    const [t, i18n] = useTranslation();
    return (
        <div>
            <ul className={classes.ul}>
                <li className={classes.li} onClick={() => handleChange("en")}>EN
                    {i18n.language == "en" && (<BsCheckLg />)}
                </li>
                <li className={classes.li} onClick={() => handleChange("ar")}>AR
                    {i18n.language == "ar" && (<BsCheckLg />)}
                </li>
            </ul>
        </div>
    )
}

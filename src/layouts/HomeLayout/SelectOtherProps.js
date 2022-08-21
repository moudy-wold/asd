import React from 'react';
import 'antd/dist/antd.css';
import { Button, Dropdown, Menu, Space } from 'antd';
import { BsFillPersonDashFill, BsBank, BsFillArrowDownCircleFill } from "react-icons/bs";
import { Link, makeStyles } from "@material-ui/core";
import { SiSpringCreators } from "react-icons/si";
import { GiBundleGrenade } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { useTranslation } from "react-i18next";


const useStyles = makeStyles((theme) => ({
    drop: {
        backgroundColor: "transparent",
        border: 'none',
        color: "#FFF",

        "&:hover": {
            backgroundColor: "transparent"
        },

    },
    btn: {
        fontSize: "17px",
        fontWeight: "500",
        margin: "0",
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
        "& span": {
            position: "initial!important",
        },
    },
}))



const SelectOtherProps = () => {
    const [t, i18n] = useTranslation();
    const profileMenu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a rel="noopener noreferrer" href="/profilesettings">
                            {t('navBar.edite')}
                        </a>
                    ),
                    icon: <BsFillPersonDashFill className="navSubIcon" />
                },
                {
                    key: '2',
                    label: (
                        <a rel="noopener noreferrer" href="/profile">
                            {t('navBar.wallet')}
                        </a>
                    ),
                    icon: <BsBank className="navSubIcon" />
                },
                {
                    key: '3',
                    label: (
                        <a rel="noopener noreferrer" href="#">
                            {t('navBar.referral')}
                        </a>
                    ),
                    icon: <BsFillArrowDownCircleFill className="navSubIcon" />,
                },
            ]}
        />
    );

    const usersMenu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a rel="noopener noreferrer" href="/user-list">
                            {t('navBar.users')}
                        </a>
                    ),
                    icon: <FiUsers className="navSubIcon" />
                },
            ]}
        />
    );
    const creatorsMenu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a rel="noopener noreferrer" href="/SearchResult">
                            {t('navBar.creators')}
                        </a>
                    ),
                    icon: <SiSpringCreators className="navSubIcon" />
                },
            ]}
        />
    );
    const bundlesMenu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a rel="noopener noreferrer" href="/bundles_home">
                            {t('navBar.bundles')}
                        </a>
                    ),
                    icon: <GiBundleGrenade />
                }
            ]}
        />
    );

    const classes = useStyles();
    const {
        drop
    } = useStyles();
    return (
        <Space direction="vertical" style={{ marginLeft: "10px" }}>
            <Space wrap>
                <Dropdown overlay={profileMenu} placement="bottomLeft" className={classes.drop}>
                    <Button className={classes.btn}>{t('navBar.myProfile')}</Button>
                </Dropdown>
                {/* <Dropdown overlay={usersMenu} placement="bottomLeft" className={classes.drop}>
                    <Button className={classes.btn}>{t('navBar.users')}</Button>
                </Dropdown> */}
                <Link to="./metaverse" className={classes.btn}>
                    <a href="./user-list" >{t('navBar.users')}</a>
                </Link>
                <Dropdown overlay={creatorsMenu} placement="bottomLeft" className={classes.drop}>
                    <Button className={classes.btn}>{t('navBar.creators')}</Button>
                </Dropdown>
                <Dropdown overlay={bundlesMenu} placement="bottomLeft" className={classes.drop}>
                    <Button className={classes.btn}>{t('navBar.bundles')}</Button>
                </Dropdown>
                <Link to="./metaverse" className={classes.btn}>
                    <a href="./metaverse" >{t('navBar.metaverse')}</a>
                </Link>
            </Space>
        </Space>
    )
};

export default SelectOtherProps;
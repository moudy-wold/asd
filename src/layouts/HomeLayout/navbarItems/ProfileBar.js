import React, { useContext } from "react";
import style from "./style.css"
import { CgProfile, BsBank, AiOutlineQrcode } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/User";
const ProfileBars = () => {
    const user = useContext(UserContext);
    // console.log(user.userData?.referralCode)


    return (
        <div className={style.navSubWrapper}>
            asdfghrweq
        </div>
    );
};

export default ProfileBars;

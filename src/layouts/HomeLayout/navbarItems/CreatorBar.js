import React, { useContext } from "react";
import "./style.css"
import { BsFillPersonDashFill, BsBank, BsFillArrowDownCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/User";
import "./style.css"

const ProfileBar = () => {
    const user = useContext(UserContext);

    return (

        <div className="navSubWrapper creator">
            <ul className="navSubList">
                <li className="navSubItem">
                    <Link to="/profilesettings" className="navSubLink">
                        <BsFillPersonDashFill className="navSubIcon" />
                        <span className="navSubText">Edite Prodile</span>
                    </Link>
                </li>
                <li className="navSubItem">
                    <Link to="/profile" className="navSubLink">
                        <BsBank className="navSubIcon" />
                        <span className="navSubText">Wallet</span>
                    </Link>
                </li>
                <li className="navSubItem">
                    <Link to="" className="navSubLink">
                        <BsFillArrowDownCircleFill className="navSubIcon" />
                        <span className="navSubText">Refferl: {user.userData?.referralCode}</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ProfileBar;

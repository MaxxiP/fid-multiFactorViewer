import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Link } from "react-router-dom";


export const SignOutButton = () => {
    const { instance } = useMsal();

    const [anchorEl, setAnchorEl] = useState(null);


    const handleLogout = (logoutType) => {
        setAnchorEl(null);

        if (logoutType === "popup") {
            instance.logoutPopup();
        } else if (logoutType === "redirect") {
            instance.logoutRedirect();
        }
    }



    return (
        <>
            <ul className="navbar-nav">

                <Link to='/' className="nav-item" onClick={() => handleLogout("popup")} key="logoutPopup">Log Out</Link>
            </ul>
        </>
    )
};


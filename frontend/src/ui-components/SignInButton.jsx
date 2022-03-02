import { useState } from "react";
import { useMsal } from "@azure/msal-react";

import { loginRequest } from "../authConfig";
import { Link } from "react-router-dom";


export const SignInButton = () => {
    const { instance } = useMsal();

    const [anchorEl, setAnchorEl] = useState(null);


    const handleLogin = (loginType) => {
        setAnchorEl(null);

        if (loginType === "popup") {
            instance.loginPopup(loginRequest);

            

        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest);
        }
    }

    return (

            <Link to='/' onClick={() => handleLogin("popup")} key="loginPopup">
                <button type="button" className="btn btn-primary">Login mit Microsoft</button>
            </Link>

    )
};

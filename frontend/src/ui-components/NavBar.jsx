import SignInSignOutButton from "./SignInSignOutButton";
import { Link } from "react-router-dom";
import { FaQrcode } from 'react-icons/fa';

const NavBar = () => {

    return ( 
        <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <FaQrcode />
          </a>
            <div className="" id="navbarNav">

                    <SignInSignOutButton />

          </div>
        </div>
      </nav>
    );
};

const NavLinks = () => {


}

export default NavBar;
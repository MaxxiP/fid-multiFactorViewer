//import Typography from "@material-ui/core/Typography";
import NavBar from "./NavBar";

export const PageLayout = (props) => {

    return (
        <div>
            <NavBar />
            <div>
                {props.children}
            </div>

        </div>
    );
};

// Msal imports
import { MsalAuthenticationTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";


import { ErrorComponent } from "../ui-components/ErrorComponent";


import ProfileContent from '../ui-components/ProfileContent'
import { SignInButton } from "../ui-components/SignInButton";


export function Home() {
    const authRequest = {
        ...loginRequest
    };

    return (
      <>
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Silent} 
            authenticationRequest={authRequest} 
            errorComponent={ErrorComponent} 
        >
            <ProfileContent />
        </MsalAuthenticationTemplate>
        <UnauthenticatedTemplate>
            <center>
            <div className="card col-md-4 mt-3" >
                <div className="card-body">
                    <h5 className="card-title">Log In mit Microsoft</h5>
                    <p className="card-text">Nutze deinen Firmenaccount um dich einzuloggen</p>
                    <SignInButton />
                </div>
            </div>
            </center>
        </UnauthenticatedTemplate>
        </>
      )
};


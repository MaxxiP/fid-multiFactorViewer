import { useEffect, useState } from "react";

// Msal imports
import { useMsal } from "@azure/msal-react";
import axios_back from '../axios'
import { render } from "react-dom";

import AdminDash from './AdminDash'
import UserDash from './UserDash'

const ProfileContent = () => {
    const { accounts, instance } = useMsal();
    const [userData, setUserData] = useState(null);
    const [role, setRole] = useState(null)
    const [content, setContent] = useState(null)
    const [token, setToken] = useState(null)
    const [tokenA, setTokenA] = useState(null)



    useEffect(() => {
        const user_roles = accounts[0].idTokenClaims.roles;

        instance.acquireTokenSilent({ accounts: accounts[0]}).then((res) => {

            if(res.accessToken){
                setTokenA(res.accessToken)
            }
            setToken(res.idToken)
            setUserData(res.idTokenClaims)
        
        })

        if(user_roles){
            if(user_roles.includes('<ADMIN ROLE ID>')){
                setRole('admin')
            }else if(!user_roles.includes('<ADMIN ROLE ID>' && user_roles.includes('<USER ROLE ID>'))){
                setRole('user')
                let data = <> <p>User Dashboard</p> <p>Information will be here</p></>
                setContent(data)
            }else if(!user_roles.includes('<ADMIN ROLE ID>' && !user_roles.includes('<USER ROLE ID>'))){
                setRole('notpermitted')
                let data = <> <p>User Dashboard</p> <p>Information will be here</p> </>
                setContent(data)
            }
        }else{
            let data = <> <p>Error</p> <p>User does not seem to be member of needed groups</p> </>
            setContent(data)
        }

        
    }, []);

    let dashbaord = <p>Loading</p>
    if(role === 'admin' ){
        dashbaord = <AdminDash content={content} userData={userData} tokenA={tokenA} token={token}/>
    }else if(role === 'user'){
        dashbaord = <UserDash content={content} userData={userData} token={token}/>
    }else{
        dashbaord = <p>Error</p>
    }

    return (
        <>
            <div>
                {dashbaord}
            </div>
        </>
    );
};






export default ProfileContent
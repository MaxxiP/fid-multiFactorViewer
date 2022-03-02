import { useEffect, useState } from "react";

// Msal imports

import axios_back from '../axios'

import ServiceCard from './ServiceCard'

const UserDash = (props) => {
    const [serviceInfo, setServiceInfo] = useState(null)

    let interval
        useEffect(() => {
            if(props.token && props.userData){
                // //Send request to API
                function getUserServices() {
                    axios_back.get('/service/userServices/' + props.userData.oid,{
                    headers: {
                    'Authorization': `Bearer ${props.token}`
                    }
                }).then(res => {
                    setServiceInfo(res.data)
                })
                }
    
                getUserServices()
                interval = setInterval(() => getUserServices(), 10000)
            }else{
                //console.log('Token or user ID not present');
            }

            

            return () => {
                clearInterval(interval)
            }
        }, [props.token, props.userData])
    

    return(
        <>
            <div>
                {
                    serviceInfo ? (
                        serviceInfo.map(service => <ServiceCard service={service} />)
                    ) : null
                
                }
            </div>
        </>
    )
}

export default UserDash
import { useEffect, useState } from "react";
import axios_back from '../axios'

import EditUserList from "./EditUserList";

const EditService = (props) => {
    const [data, setData] = useState(null)
    const [userAll, setUserAll] =useState(null)

    const [token, setToken] = useState(null)

    const [serviceName, setServiceName] = useState(null)
    const [serviceMail, setServiceMail] = useState(null)
    const [serviceSecret, setServiceSecret] = useState(null)
    const [serviceEncoding, setServiceEncoding] = useState(null)
    const [serviceLength, setServiceLength] = useState(null)
    
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const [userList, setUserList] = useState(null)

    if(props.token){

    }else{
        //console.log(Date.now() + ': Token not present');
    }


    useEffect(() => {
        if(props.token && props.id){
            setToken(props.token)
            //Send request to API
            function getService () {
                axios_back.get('/service/service/' + props.id, {
                headers: {
                'Authorization': `Bearer ${props.token}`
                }
            }).then(res => {

                setData(res.data)
                setUserList(res.data.assigned_user)
            })
            }
        
                    //Send request to API
            function getUsers () {
                axios_back.get('/graph/users', {
                headers: {
                'Authorization': `Bearer ${props.tokenA}`
                }
            }).then(res => {
                setUserAll(res.data)
            }).catch(error => {
                //console.log(error);
            })
            }

            getUsers()
 
            getService()
        }else{
            //console.log('ID or Token not present');
        }

    }, [props.token, props.id, props.tokenA])

    function removeUser(id){
        //console.log(id);
        for (let index = 0; index < userList.length; index++) {
            const element = userList[index];
            
            if(element['id'] === id){
                //console.log("Element wurde entfernt " + element);
                userList.splice(index, 1)

                //console.log(userList);

                setUserList(userList);
            }
            
        }

    }
    

    function addSelectedUser(id, name){
        //console.log('Selected user: ' + name + " " + id);
        if(!userList.some(e => e.id === id)){
            let assignedUserListChanged = userList
            assignedUserListChanged.push({
                "id": id,
                "name": name
            })
            setUserList(assignedUserListChanged)
        }else{
            //console.log("user already on list");
        }

        //console.log(userList);
    }

    function updateServiceData(e){
        e.preventDefault();

        const updatedServiceData = {
            id: props.id,
            name: serviceName,
            mail: serviceMail,
            secret: serviceSecret,
            options: {
                base_encoding: serviceEncoding,
                digits: serviceLength
            },
            assigned_user: userList
        }


        if(token){
            axios_back.patch('/service/service/' + updatedServiceData.id, updatedServiceData, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                setMessage(res.data.message)
                setError(null)

            })
            .catch(err => {
                console.error(err);
                setError(err.response.data.error)
                setMessage(null)
            })
        }else{
            setError('Formulardaten konnten aufgrund von Authentifizierungsproblemen nicht gesendet werden.')
        }


    }
    return(
        <div className="card">
        <div className="card-header">
        <h3>Edit Service</h3>
        </div>
        <div className="card-body">
        <form onSubmit={updateServiceData}>
        <div className='row'>
            <div className="col">
                <label htmlFor='name'>Name:</label>
                    <input 
                        id='serviceName' 
                        placeholder={data ? data.name : ''}
                        minLength='2'
                        maxLength='25' 
                        type='text'
                        className="form-control" 
                        onChange={ e => setServiceName(e.target.value)}
                        />
            </div>
            <div className="col">  
                <label htmlFor='name'>Email:</label>                   
                    <input 
                        id='serviceMail' 
                        placeholder={data ? data.mail : ''}
                        minLength='8'
                        maxLength='40' 
                        type='email'
                        className="form-control" 
                        onChange={ e => setServiceMail(e.target.value)}
                        />
            </div>
            <div className="col">  
            <label htmlFor='name'>Secret:</label>                   
                <input 
                    id='serviceSecret' 
                    placeholder={data ? data.secret : ''}
                    minLength='5'
                    maxLength='100' 
                    type='text'
                    className="form-control" 
                    onChange={ e => setServiceSecret(e.target.value)}
                    />
            </div>
            <div className="col">
                <label htmlFor='name'>Encoding:</label>                   
                    <input 
                        id='serviceEncoding' 
                        placeholder={data ? data.options.base_encoding : ''}
                        minLength='5'
                        maxLength='100' 
                        type='text'
                        className="form-control" 
                        onChange={ e => setServiceEncoding(e.target.value)}
                        />
            </div>
            <div className="col">
                <label htmlFor='name'>Length:</label>                   
                <input 
                    id='serviceLength' 
                    placeholder={data ? data.options.digits : ''}
                    minLength='1'
                    maxLength='3' 
                    type='text'
                    className="form-control" 
                    onChange={ e => setServiceLength(e.target.value)}
                    />
            </div>


            <div className="row">
                <div className="col">
                {error ? 
                    <div className="alert alert-warning" role="alert">
                        {error}
                    </div> 
                : null }
                {message ? 
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div> 
                : null }
                </div>
            <div className="col align-self-end">
                <button className="btn btn-primary">Änderung Service</button>
            </div>
            
            </div>

        </div>

        <div className="row">  
                    <div className="col-auto">
                    <select className="form-select" size="6" aria-label="size 6 select example">
                            {
                                userAll ? (userAll.map((user, index) => (
                                <option key={user.id} onClick={() => addSelectedUser(user.id, user.name)}>{user.name}</option>
                                ))) : <option disabled>No user found</option>
                            }
                    </select>
                    </div>
                    <div className="col-auto">
                    <label htmlFor='name'>Assigned User</label>
                        <EditUserList userList={userList} userRemoveHandler={removeUser}/>
                    </div>
            </div>


        </form>
        </div>
        </div>
    )
}

export default EditService
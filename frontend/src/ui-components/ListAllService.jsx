import { useEffect, useState } from "react";
import axios_back from '../axios'


import { FaTrash, FaPen } from 'react-icons/fa';


const ListAllService = (props) => {
    const [data, setData] = useState(null)
    const [loading , setLoading] = useState(null)


    useEffect(() => {
        setLoading(true)
        if(props.token){
            //Send request to API
            function getServices () {
                axios_back.get('/service/services', {
                headers: {
                'Authorization': `Bearer ${props.token}`
                }
            }).then(res => {
                let dataList = []
    
                res.data.forEach((service, index) => {
                    dataList.push( <li key={index}>{service.name}</li>)
                });
    
                setData(res.data)
                setLoading(false)
            })
            }

            getServices()
        }else{
            //console.log(Date.now() + ': Token not present');
        }

    }, [props.token])



    function removeService(id){


        axios_back.delete('/service/service/' + id, {
            headers: {
            'Authorization': `Bearer ${props.token}`
            }
        })
        .then(res => {
            //console.log('Deleted Service ' + id);
        })
        .catch(err => console.error(err));
    }


    if (!data) return null;


    return(
        <>
        { loading ? (<p>Loading</p>) : (
        <div className="card">
            <div className="card-header">
            <h3>Existing Services</h3>
            </div>
            <div className="card-body">
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Service Name</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Asigned User</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((service, index) => 
                        <tr key={service.id}>
                            <th scope="row">{index+1}</th>
                            <td>{service.name}</td>
                            <td>{service.mail}</td>
                            <td>{
                                service.assigned_user.map(user =>{
                                    return user.name + '; '
                                })    
                            }</td>
                            <td><FaPen onClick={() => {props.getIDfunc(service.id)}} /></td>
                            <td><FaTrash onClick={() => {if(window.confirm('Service wirklich löschen?'))removeService(service.id)}} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            </div>
            )}
            </>
    )
}

export default ListAllService
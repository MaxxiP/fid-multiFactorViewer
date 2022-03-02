import { useEffect, useState } from "react";


import NewService from "./NewService";
import ListAllService from "./ListAllService";
import EditService from "./EditService";

const AdminDash = (props) => {
    const [editId, setEditId] = useState(null)

    const getIDforEdit = (id) => {
        setEditId(id)
    }

    useEffect(() => {
 
    },[props.tokenA])






    return (
        <>
        <div className="container-fluid">
            <div className="row mt-3">

                <div className="col-sm-12"> 
                    <NewService token={props.token} />
                </div> 
            </div>
            <div className="row mt-3">
                <div className="col-xl-12">
                    <EditService token={props.token} id={editId} tokenA={props.tokenA}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-xl-12"> 
                    <ListAllService token={props.token} getIDfunc={getIDforEdit}/>
                </div>
            </div>


        </div>
        </>
        
    )
}

export default AdminDash
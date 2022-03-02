const ServiceCard = (props) => {
    return (
        <div className="container mt-2">
            <div className="row justify-content-center ">
                <div className="card text-center col-sm-3" >
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text">{props.service.name}</h6>
                        <h6 className="card-subtitle mb-2 text">{props.service.mail}</h6>
                        <h5 className="card-subtitle mb-2 text">{props.service.code}</h5>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ServiceCard
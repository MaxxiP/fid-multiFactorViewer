import { useEffect, useState } from 'react'
import axios_back from '../axios'

const NewService = (props) => {
    const [serviceName, setServiceName] = useState(null)
    const [serviceMail, setServiceMail] = useState(null)
    const [serviceSecret, setServiceSecret] = useState(null)
    const [serviceEncoding, setServiceEncoding] = useState(null)
    const [serviceDigits, setServiceDigits] = useState(null)

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(props.token)
    }, [props.token])

    function createNewService(e){
        e.preventDefault();

        const newServiceData = {
            name: serviceName,
            mail: serviceMail,
            secret: serviceSecret,
            options: {
                base_encoding: serviceEncoding,
                digits: serviceDigits
            }
        }; 

        if(token){
            axios_back.post('/service/service/', newServiceData, {
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
            <h3>Add a new Service</h3>
        </div>
        <div className="card-body">
            <form onSubmit={createNewService}>
                <div className='row'>
                    <div className="col">
                        <label htmlFor='name'>Name:</label>
                            <input 
                                id='serviceName' 
                                placeholder='Insert name'
                                required
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
                            placeholder='Insert mail'
                            required
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
                            placeholder='Insert secret'
                            required
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
                                placeholder='base_64'
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
                                placeholder='6'
                                minLength='1'
                                maxLength='3' 
                                type='number'
                                className="form-control" 
                                onChange={ e => setServiceDigits(e.target.value)}
                                />

                    </div>
                    <div className="col align-self-end">
                        <button className="btn btn-primary">Hinzufügen</button>
                    </div>
                </div>
                <div className='row'>
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


                
            </form>
        </div>
    </div>
    )
}

export default NewService


import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';import axios from "axios";

const endpoint = 'http://127.0.0.1:8000/api';
let options = {};

export const Register = (props) => {
    
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',  
        telephone:'', 
        user_type:1
    });

    const handleInputChange = (event) => {
        setUser({
            ...user,
            [event.target.name] : event.target.value
        })
    };
    localStorage.clear('user');
    const storeUser = async (e) =>{

        e.preventDefault();
        try{
            const response = await axios.post(`${endpoint}/register`, user, options )
            
            if(response.data.authorization.token){
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location = '/publications';    
            }
        }catch(e){
            setError('No ha sid posible completar registro');
            setShow(true);   
            localStorage.clear('user');      
        }

    }


    return (
        <div className="row justify-content-center">
            <Row>
                <Col xs={8}>
                    <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
                        <Toast.Body>{error}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
            <div className="col-md-8">
                <div className="card " id="fregister">
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={storeUser} >
                            <div className="row mb-3">
                                <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Name</label>
                                <div className="col-md-6">
                                    <input 
                                        type="text"
                                        className="form-control" 
                                        name="name" 
                                        onChange={handleInputChange}
                                        required 
                                        autoComplete="name" 
                                        autoFocus 
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">E-Mail</label>
                                <div className="col-md-6">
                                    <input 
                                        type="email"
                                        className="form-control" 
                                        name="email" 
                                        onChange={handleInputChange}
                                        required 
                                        autoComplete="email" 
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>
                                <div className="col-md-6">
                                    <input 
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        onChange={handleInputChange} 
                                        required 
                                        autoComplete="new-password" 
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-end">Phone</label>
                                <div className="col-md-6">
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="telephone"
                                        onChange={handleInputChange}
                                        required 
                                        autoComplete="new-phone" />
                                </div>
                            </div>

                            <div className="row mb-0">
                                <div className="col-md-6 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
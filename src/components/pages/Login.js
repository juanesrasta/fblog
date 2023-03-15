import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const endpoint = 'http://127.0.0.1:8000/api';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState([])
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

   localStorage.clear('user');

    const signin = async (e) => {
        
        e.preventDefault();
        try{
            const response = await axios.post(`${endpoint}/login`, {email, password})
            
            if(response.data.authorization.token){
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location = '/publications';    
            }
        }catch(e){
            setError('No ha sid posible iniciar sesión');
            setShow(true);         
        }
        
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <Row>
                    <Col xs={8}>
                    <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
                        <Toast.Body>{error}</Toast.Body>
                    </Toast>
                    </Col>
                </Row>
                <div className="card" id="fregister">
                    <div className="card-header">Sigin</div>
                    <div className="card-body">
                        <form onSubmit={signin}>
                            <div className="row mb-3">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email</label>
                                <div className="col-md-6">
                                    <input 
                                        value={email}
                                        onChange={ (e)=> setEmail(e.target.value)}
                                        type="email"
                                        className="form-control" 
                                        required 
                                        autoComplete="email" 
                                        autoFocus />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-end"                                >
                                    Password
                                </label>
                                <div className="col-md-6">
                                    <input 
                                        value={password} 
                                        onChange={ (e)=> setPassword(e.target.value)} 
                                        type="password"
                                        className="form-control" 
                                        name="password"
                                        required 
                                        autoComplete="current-password" />
                                </div>
                            </div>                            
                            <div className="row mb-0">
                                <div className="col-md-2 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Sigin
                                    </button>
                                    
                                </div>
                                <div className="col-md-2 offset-md-2">
                                <Link 
                                        to='/register' 
                                        className='btn btn-sm btn-default '>
                                        Register
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>                
            </div>
        </div>
    );
};
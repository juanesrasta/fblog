import axios from 'axios';
import React, {useState, useEffect} from 'react';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



let options = {};
const endpoint = 'http://127.0.0.1:8000/api';
const access_token = JSON.parse(localStorage.getItem('user'));
if(access_token){
    options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ access_token.authorization.token 
        }
    }
};

export const User = () =>{

    const [users, setUsers] = useState([]);
    const [userid, setUserId] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [edituser, setEditUser] = useState({
        name:'',
        email:'',
        telephone:'', 
        user_type: '',
    });

    useEffect ( () => {
        getAllUser()
    }, [])

    const getAllUser = async () => {
        const response = await axios.get(`${endpoint}/user`, options)
        setUsers(response.data.users)
    }

    const deleteUser = async (id) =>{
        await axios.delete(`${endpoint}/deluser/${id}`, options)
        getAllUser()
    }

    const callModal = (user) =>{
        setUserId(user.id)
        setEditUser({
            name:user.name,
            email:user.email,
            telephone:user.telephone, 
            user_type:user.user_type,
        })
        handleShow()
    }

    const handleInputChange = (event) => {
        setEditUser({
            ...edituser,
            [event.target.name] : event.target.value
        })
    };

    const executeEditUser = async () =>{
        await axios.put(`${endpoint}/user/${userid}`,edituser, options)
        getAllUser()
        handleClose()
    }


    return (
        <div className="row justify-content-center">
            <div className="col-md-12">
                <div className="">
                    <div className="">
                        <table className='table'>
                            <thead className='bg-primary text-white'>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            { users.map( (user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>
                                    <button 
                                            onClick={()=>callModal(user)} 
                                            className='btn btn-sm btn-primary'>Edit</button>&nbsp;&nbsp;
                                        <button 
                                            onClick={ ()=>deleteUser(user.id)} 
                                            className='btn btn-sm btn-danger'>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}             
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                            <div className="row mb-3">
                                <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Name</label>
                                <div className="col-md-6">
                                    <input 
                                        type="text"
                                        value={edituser.name}
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
                                        value={edituser.email}
                                        className="form-control" 
                                        name="email" 
                                        onChange={handleInputChange}
                                        required 
                                        autoComplete="email" 
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="telephone" className="col-md-4 col-form-label text-md-end">Phone</label>
                                <div className="col-md-6">
                                    <input 
                                        type="text" 
                                        value={edituser.telephone}
                                        className="form-control"
                                        name="telephone"
                                        onChange={handleInputChange}
                                        required 
                                        autoComplete="new-phone" />
                                </div>
                            </div>
                                <div className="row mb-3">
                                    <label htmlFor="telephone" className="col-md-4 col-form-label text-md-end">Type User</label>
                                    <div className="col-md-6">
                                    <Form.Select 
                                        name="user_type"
                                        onChange={handleInputChange} 
                                    >
                                        <option value="1">administrator</option>
                                        <option value="2" selected>Single User</option>
                                    </Form.Select>
                                </div>
                            </div>

                        </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={executeEditUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>    
        </div>
        
    )

}
import axios from 'axios';
import React, {useState, useEffect} from 'react';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


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


export const Category = () => {

    const [name, setCategory] = useState('');
    const [nameedit, setCategoryEdit] = useState('');
    const [userid, setUserId] = useState('');
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect ( () => {
        getAllCategories()
    }, [])

    const getAllCategories = async () => {
        const response = await axios.get(`${endpoint}/categories`, options)
        setCategories(response.data.categories)
    }
    
    const store = async (e) => {
        e.preventDefault();
        await axios.post(`${endpoint}/category`, {name}, options)
        getAllCategories()
    }

    const callModal = (id, descat) =>{
        setUserId(id)
        setCategoryEdit(descat)
        handleShow()
    }

    const editCategory = async () => {
        await axios.put(`${endpoint}/editcategory/${userid}`,{'name':nameedit}, options)
        getAllCategories()
        handleClose()
    }

    const deleteCategory = async (id) => {
        await axios.delete(`${endpoint}/delcategory/${id}`, options)
        getAllCategories()
    }

    return (
        <div className="row justify-content-center">
            <h3>Categories</h3>
            <div className="col-md-12">
                <div className="">
                    <div className="">
                        <form onSubmit={store} id="fcategory">
                            <div className="row mb-2">
                                <label htmlFor="name" className="col-md-3 col-form-label text-md-end">New Category</label>
                                <div className="col-md-6">
                                    <input 
                                        value={name} 
                                        onChange={ (e)=> setCategory(e.target.value)}
                                        type="text"
                                        className="form-control" 
                                        name="name" 
                                        required 
                                        autoFocus 
                                    />
                                </div>
                                <div className="col-md-1">
                                    <button type="submit" className="btn btn-success">
                                        Save
                                    </button>
                                </div>

                            </div>
                        </form>
                        <table className='table'>
                            <thead className='bg-primary text-white'>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            { categories.map( (category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.category}</td>
                                    <td>
                                        <button 
                                            onClick={()=>callModal(category.id, category.category)} 
                                            className='btn btn-sm btn-primary'>Edit</button>&nbsp;&nbsp;
                                        <button onClick={ ()=>deleteCategory(category.id)} className='btn btn-sm btn-danger'>Delete</button>
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
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row mb-2">
                            <label htmlFor="name" className="col-md-3 col-form-label text-md-end">Category</label>
                            <div className="col-md-6">
                                <input 
                                    value={nameedit} 
                                    onChange={ (e)=> setCategoryEdit(e.target.value)}
                                    type="text"
                                    className="form-control" 
                                    name="nameedit" 
                                    required 
                                    autoFocus 
                                />
                            </div>
                            
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editCategory}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
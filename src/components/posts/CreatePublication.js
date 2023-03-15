import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

const endpoint = 'http://127.0.0.1:8000/api';
let options = {};
const access_token = JSON.parse(localStorage.getItem('user'));
if(access_token){
    options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ access_token.authorization.token 
        }
    }
}
export const CreatePublication = () => {

    const [categories, setCategories] = useState([]);
    
    useEffect ( () => {
        getAllCategories()
    }, [])

    const getAllCategories = async () => {
        const response = await axios.get(`${endpoint}/categories`, options)
        setCategories(response.data.categories)
    };

    const [state, setState] = useState({
        txtcategory:'',
        txttitle:'',
        txtslug:'',  
        txtshort:'',  
        txtlong:''
    });
    
    const [file, setFile] = useState({
        txtimage:''
    });

    const handleFileChange = (event) => {
        if (event.target.files) {
            setFile({
                ...file,
                [event.target.name]: event.target.files[0]
            })
        }
    };
    
    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name] : event.target.value
        })
    };
    
    const store = async (e) => {
        e.preventDefault();           
        await axios.post(`${endpoint}/publication`, {state,file}, {headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${access_token.authorization.token}`  
            }}
        )
        
    }

    return (
        <div className="row justify-content-center">
            <h3>Post News</h3>
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">New Publication</div>

                <div className="card-body">
                    <form onSubmit={store} >
                        <div className="row mb-3">
                            <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Category</label>
                            <div className="col-md-6">
                                <Form.Select 
                                    name="txtcategory" 
                                    aria-label="Default select example"
                                    onChange={handleInputChange}>
                                    <option value="">select category</option>
                                   { categories.map( (cat) => (
                                        <option 
                                            key={cat.id} 
                                            value={cat.id}>{cat.category}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="title" className="col-md-4 col-form-label text-md-end">Title</label>
                            <div className="col-md-6">
                                <input 
                                    id="title" 
                                    type="text"                                       
                                    className="form-control" 
                                    name="txttitle" 
                                    onChange={handleInputChange}
                                    required 
                                 />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="slug" className="col-md-4 col-form-label text-md-end">Slug</label>
                            <div className="col-md-6">
                                <input 
                                    id="txtslug" 
                                    type="text"
                                    className="form-control"
                                    name="txtslug" 
                                    onChange={handleInputChange}
                                    required                                    
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="short-text" className="col-md-4 col-form-label text-md-end">Short Text</label>
                            <div className="col-md-6">
                                <input 
                                    id="short-text" 
                                    type="text" 
                                    className="form-control"
                                    name="txtshort"
                                    onChange={handleInputChange} 
                                    required
                                 />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="long-text" className="col-md-4 col-form-label text-md-end">Long Text</label>
                            <div className="col-md-6">
                                <input 
                                    id="long-text" 
                                    type="text" 
                                    className="form-control"
                                    name="txtlong" 
                                    onChange={handleInputChange}
                                    required
                                 />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="news-image" className="col-md-4 col-form-label text-md-end">News Image</label>
                            <div className="col-md-6">
                                <input 
                                    id="news-image" 
                                    type="file" 
                                    className="form-control"
                                    name="txtimage"
                                    onChange={handleFileChange} 
                                    required
                                    
                                 />
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
    )
}
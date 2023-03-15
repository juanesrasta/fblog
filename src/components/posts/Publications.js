import { useState, useEffect} from 'react';
import axios from 'axios';
import {FaRegTrashAlt} from 'react-icons/fa';
import {FaPencilAlt} from 'react-icons/fa';

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


export const Publications = ({user}) => {
    

    const [publications, setPublications] = useState([]);
    
    useEffect ( () => {
        getAllPublications()
    }, [])

    const getAllPublications = async () => {
        const response = await axios.get(`${endpoint}/publications`, options)
        setPublications(response.data.publications)
    }; 

    return (
        <div class="container-fluid">
            <h3>News</h3>
            {  publications.map( (pub) => (
                <div class="card col-sm-4" id="card" key={pub.id}>
                <img class="card-img-top" src={`http://localhost/konecta/sportblog/public/images/${pub.image}`} alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title">{pub.title}</h5>
                    <p class="card-text">{pub.short_text}</p>
                    <FaPencilAlt /><FaRegTrashAlt />
                </div>                
            </div>
            ))}
        </div>
    )
};

import React from "react";
import { Link } from "react-router-dom";
import bootstrap from 'bootstrap';


const NavbarAdmin = () => {

    const logout = () =>{
        localStorage.clear('user');
        window.location = '/home';
    }

    return (
        <ul className="nav justify-content-center" id="nav-2">
            <li class="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/publications">Sport News</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/pubcreate">Post News</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/category">Categories</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/user">User</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="" onClick={logout}>Logout</Link>
            </li>
        </ul>) 
};

export default NavbarAdmin
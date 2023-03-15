import React, {useState,Fragment, useEffect} from "react";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";

export const Layout = ({children}) => {
    const [nav, setNav] = useState('')

    useEffect ( () => {
        Nav()
    },[]);  
    const Nav = () =>{
        let gdata = JSON.parse(localStorage.getItem('user'));
        if(localStorage.getItem('user')!==null && gdata.user.user_type == 1){
            setNav(
                <Fragment>
                    <Navbar />
                    <NavbarAdmin />
                </Fragment>
            )
        }else{
            setNav(
                <Fragment>
                    <Navbar />
                </Fragment>
            )
        }
    };

    return (
        <div>
            {nav}
            <div className="container">
                { children }
            </div>
        </div>
    );
};

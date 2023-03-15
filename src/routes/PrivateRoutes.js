import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({children}) => {
    
    if(localStorage.getItem('user')!==null){
        return children
    }else{
        return <Navigate to="/login" />
    }
    
};
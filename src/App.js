import './App.css';

import React, { Fragment} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Layout} from "./components/Layout";
import {Home} from "./components/pages/Home";
import {Login} from "./components/pages/Login";
import {Register} from "./components/pages/Register";

import {Publications} from "./components/posts/Publications";
import {Category} from "./components/posts/Category";
import {CreatePublication} from "./components/posts/CreatePublication";
import { PrivateRoutes } from './routes/PrivateRoutes';
import { User } from './components/posts/User';

function App() {

return (
    <div className="App">
      <BrowserRouter>
        <Layout>
        <Fragment>
          <Routes>
            <Route path="/" element={<Home/> } />
            <Route path="/home" element={<Home/> } />
            <Route path="/login" element={<Login/> } />
            <Route path="/register" element={<Register/> } />
            <Route  path='/publications' element={
              <PrivateRoutes >
                  <Publications/>
              </PrivateRoutes>
            } />
            <Route  path='/pubcreate' element={
              <PrivateRoutes >
                  <CreatePublication/>
              </PrivateRoutes>
            } />
            <Route  path='/category' element={
              <PrivateRoutes >
                  <Category/>
              </PrivateRoutes>
            } />
            <Route  path='/user' element={
              <PrivateRoutes >
                  <User/>
              </PrivateRoutes>
            } />         
          </Routes>
          </Fragment>
        </Layout>
      </BrowserRouter>
    </div>
  );
}


export default App;

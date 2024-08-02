import React, { useEffect, useState } from 'react';
import fon from "./img/fon2.jpeg"
import { Navbar } from './Components/Navbar';
import { Footer } from './Components/Footer';
import Mainrouter from './Mainrouter';
import "./Firebase/Config";
import { useAppSelector } from './hooks/redux';
import { useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { checkAuthState } from './Store/servers/AuthServer';
import {  GetProduct } from './Store/servers/ProductServer';

function App() {
  const auth =getAuth()
  const dispatch = useDispatch()
  
  useEffect(()=>{
    checkAuthState(auth,dispatch);
    GetProduct(dispatch);
  },[])
       
  return (
  <>
    <img className='fon' src={fon} alt="" />
    <Navbar/> 
      <main>
        <Mainrouter/>
      </main>
    <Footer/>
  </>
  );
}
export default App;

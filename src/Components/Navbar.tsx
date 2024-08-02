import { useEffect, useState } from "react";
import userIc from "../icon/user.png"
import "../styles/Navbar.scss"
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { signOutAccount } from "../Store/servers/AuthServer";
import { useDispatch } from "react-redux";
import { SearchProduct } from "../Store/servers/ProductServer";

export const Navbar=()=> {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [search ,setSearch] = useState("")
  const {email,img} = useAppSelector(state=>state.userReducer)
  useEffect(()=>{
      SearchProduct(search,dispatch,navigate)
  },[search])
  
    return (
        <>
        <header>
            <nav>
                <NavLink to={"/"}><h2 className="logo">UMB<div className="nav_logo"></div>RELLA</h2></NavLink>
                <input className="nav_inp" type="search" value={search} onChange={(e)=>setSearch(e.target.value)} />
                {!email?
                 <div ><NavLink to={"/sign_in"}>Войти / </NavLink><NavLink to={"sign_up"}>Зарегистрироваться</NavLink></div>
                 :
                 <>
                 <NavLink to={"/my_profile"}>
                  <img className="nav_icon" 
                   src={img? img : userIc}  
                   alt="" />
                 </NavLink>
                </>
                 }
            </nav>
        </header>
        </>
    );
  }

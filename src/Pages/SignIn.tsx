import { useState } from "react"
import "../styles/auth.scss"
import { UseDispatch } from "react-redux"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { error } from "console"
import { NavLink, useNavigate } from "react-router-dom"
import { SignInAccount, handleGoogle } from "../Store/servers/AuthServer"
import { useDispatch } from "react-redux"

export const SignIn =()=> {
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const [email,setEmail]=useState<string>("")
    const [pass,setPass]=useState<string>("")

    const handleLogin = async(email:string,pass:string)=>{
    const auth =getAuth()
    if (!email|| !pass) {
        return alert("Не все поля заполнены")
    }
    SignInAccount(email,pass ,dispatch,navigate)
}
    return(
        <>
        <section className="auth container" >
            <h2>Войти</h2>
            <form >
            <input 
            placeholder="email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
             />
            <input
            placeholder="password"
            type="password"
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
            />

                {/* <section> */}
                    <button type="button" onClick={()=>handleLogin(email,pass)}>Войти</button>
                    <button type="button" onClick={()=>handleGoogle(dispatch,navigate)}>Войти через Google</button>
                    <NavLink to={"/"}></NavLink>
                {/* </section> */}
            </form>

        </section>
        </>
    )
}
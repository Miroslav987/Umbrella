import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createAccount, handleGoogle } from "../Store/servers/AuthServer"

import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export const SignUp =()=> {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email,setEmail]=useState<string>("")
    const [pass,setPass]=useState<string>("")
    const [passConf,setPassConf]=useState<string>("")


    const handleregis = async (email:string,pass:string,passConf:string)=>{

        if (!email|| pass !== passConf) {
            return alert("Возможно не заполнены поля и не совпадают пароли")
        }
        createAccount(email,pass,dispatch,navigate)

    }
    return(
        <>
        <section className="auth container" >
            <h2>Зарегистрироваться</h2>
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

                <input 
                placeholder="password confirm" 
                type="password" 
                value={passConf}
                onChange={(e)=>setPassConf(e.target.value)}
                />

                <button type="button" onClick={()=>handleregis(email,pass ,passConf )}>Зарегистрироваться</button>
                <button type="button" onClick={()=>handleGoogle(dispatch,navigate)}>Войти через Google</button>

            </form>

        </section>
        </>
    )
}
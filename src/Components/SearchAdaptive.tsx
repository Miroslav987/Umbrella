import "../styles/SearchAdaptive.scss"
import { useEffect, useState } from "react"
import { SearchProduct } from "../Store/servers/ProductServer"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

export const SearchAdaptive =()=> {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search ,setSearch] = useState("")
    useEffect(()=>{
        SearchProduct(search,dispatch,navigate)
    },[search])
    return (
        <>
             <input className="search_adptive" type="search" value={search} onChange={(e)=>setSearch(e.target.value)} />
        </>
    )
}

import "../styles/CardList.scss"
import { Card } from "./Card"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { useEffect } from "react"
import  loading  from "../animation/loading.gif"
import { Loading } from "./Loading"
import { SearchAdaptive } from "./SearchAdaptive"
import { CardLoad } from "./CardLoad"

export const CardList = () =>{
    const {products ,isLoading} =useAppSelector(state => state.productsReducer)

    return(
            <> 
        <article key={3} className="list">

             {!isLoading &&  <CardLoad/> }
             
                {isLoading && products.map((e)=>(
                     <Card key={e.id}  data={e} /> 
                ))}

            </article>
        </>
    )
}
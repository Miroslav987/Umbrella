
import "../styles/CardList.scss"
import { Card } from "./Card"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { useEffect } from "react"
import  loading  from "../animation/loading.gif"
import { Loading } from "./Loading"
import { SearchAdaptive } from "./SearchAdaptive"
import { NewCard } from "./NewCard"
import { CardLoad } from "./CardLoad"

export const CardList = () =>{
    const {products ,isLoading} =useAppSelector(state => state.productsReducer)

    console.log(products.length)
    
    return(
            <> 
        <article key={3} className="list">

             {!isLoading &&  <CardLoad/> }
             
                {isLoading && products.map((e)=>(
                     <NewCard key={e.id}  data={e} />
                ))}

            </article>
        </>
    )
}

import "../styles/CardList.scss"
import { Card } from "./Card"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { useEffect } from "react"
import  loading  from "../animation/loading.gif"
import { Loading } from "./Loading"
import { SearchAdaptive } from "./SearchAdaptive"
import { NewCard } from "./NewCard"

export const CardList = () =>{
    const {products ,isLoading} =useAppSelector(state => state.productsReducer)

    
    return(
            <> 
        <article className="list">
             {!isLoading && <Loading/>}
                {isLoading && products.map((e)=>(
                    <>
                        <NewCard data={e} />
                    </>
                ))}
            </article>
        </>
    )
}
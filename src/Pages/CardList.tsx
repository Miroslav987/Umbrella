
import "../styles/CardList.scss"
import { Card } from "../Components/Card"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { useEffect } from "react"
import  loading  from "../animation/loading.gif"
import { Loading } from "../Components/Loading"
import { SearchAdaptive } from "../Components/SearchAdaptive"

export const CardList = () =>{
    const {products ,isLoading} =useAppSelector(state => state.productsReducer)

    
    return(
            <> 
            <SearchAdaptive/>
        <article className="list">
             {!isLoading && <Loading/>}
                {isLoading && products.map((e)=>(
                    <>
                        <Card data={e} />
                    </>
                ))}
            </article>
        </>
    )
}
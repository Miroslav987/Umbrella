
import "../styles/CardList.scss"
import { Card } from "./Card"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { NewCard } from "./NewCard"

export const MyCardList = ({email}:any) =>{
    const {products} =useAppSelector(state => state.productsReducer)
    
    return(
        <>
            <article className="list">
                {products[0] ?products.map((e)=>(
                    <>
                    {e.user == email && <NewCard key={e.id}  data={e} />}
                    </>
                )):<><h2 style={{fontSize:'35px',color:"white"}}>Пусто</h2></>}
            </article>
        </>
    )
}
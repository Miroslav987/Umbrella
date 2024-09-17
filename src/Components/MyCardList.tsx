
import "../styles/CardList.scss"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { Card } from "./Card"

export const MyCardList = ({email}:any) =>{
    const {products} =useAppSelector(state => state.productsReducer)
    
    return(
        <>
            <article className="list">
                {products[0] ?products.map((e)=>(
                    <>
                    {e.user == email && <Card key={e.id}  data={e} />}
                    </>
                )):<><h2 style={{fontSize:'35px',color:"white"}}>Пусто</h2></>}
            </article>
        </>
    )
}
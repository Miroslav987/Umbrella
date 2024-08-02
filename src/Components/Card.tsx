
 
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../styles/Card.scss";
import { DeleteProduct} from '../Store/servers/ProductServer';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';


export const Card =({data}:any)=>{
  const navigate = useNavigate()
  const dispatch = useDispatch()

   
   
   
    
    return(
        <>
          <article onClick={()=>navigate(`/card/details/${data.id}`)}
          key={data.id} 
          className="card">

               <img src={data.img1} alt="" />
                <article className="card_info">
                    <p className="text_name">{data.name}</p>
                    <p className="text_price">{data.price}$</p>
                    <p className="text_description">{data.description}</p>
                </article>
          <button >Подробнее</button>
            {/* <button onClick={()=>DeleteProduct(data.id,dispatch)} >Удалить</button> */}
          </article>
        </>
    )
}
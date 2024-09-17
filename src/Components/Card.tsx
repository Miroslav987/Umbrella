
 
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../styles/Card.scss";
import { HashLink } from "react-router-hash-link";


export const Card =({data}:any)=>{
  const navigate = useNavigate()

    return(
        <>
        <HashLink smooth  scroll={el => {
            const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
            const yOffset = -150; 
            window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
          }} to={`/card/details/${data.id}/#det`}>
        <article
        //  onClick={()=>navigate(`/card/details/${data.id}/#card_det`)}
          key={data.id} 
          className="card">

               <img src={data.img1} alt="" />
                <article className="card_info">
                    <p className="text_name">{data.name}</p>
                    {/* <p className="text_price">{data.price}сом</p> */}
                    <p className="text_description">{data.description}</p>
                </article>
          <button ><p className="text_price">{data.price}сом</p></button>
            {/* <button onClick={()=>DeleteProduct(data.id,dispatch)} >Удалить</button> */}
          </article>
         </HashLink>
        </>
    )
}
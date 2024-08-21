import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../styles/NewCard.scss";
import { HashLink } from "react-router-hash-link";


export const NewCard =({data}:any)=>{
  const navigate = useNavigate()

    return(
        <>
        <HashLink smooth  scroll={el => {
            const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
            const yOffset = -150; 
            window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
          }} to={`/card/details/${data.id}/#det`}>
        <article
           className='ncard'  >
              <section className="img">
               <img src={data.img1} alt="" />
               </section>
               <section className="card_info">
                    <p className="text_name">{data.name}</p>
                    <p className="text_price"><span>{data.price}</span> сом</p>
                    {/* <p className="text_description">{data.description}</p> */}
                <button >Посмотреть информацию подробнее</button>
              </section>
            {/* <button onClick={()=>DeleteProduct(data.id,dispatch)} >Удалить</button> */}
          </article>
         </HashLink>
        </>
    )
}
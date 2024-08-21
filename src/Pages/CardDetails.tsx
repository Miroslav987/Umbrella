

import "../styles/CardDetails.scss"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { DeleteProduct, GetOneProduct } from "../Store/servers/ProductServer"
import { useAppSelector } from "../hooks/redux"
import { LoadingProducts } from "../Store/slices/ProductsSlice"
import { CardList } from "../Components/CardList"
export const CardDetails =()=>{
    const { id } =useParams()
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {email,img} = useAppSelector(state =>state.userReducer)
    const {product ,isLoading} =useAppSelector(state => state.productsReducer)

    
    useEffect(()=>{
        GetOneProduct(id,dispatch)
        dispatch(LoadingProducts(false))
        setImgs({"img1":["100%","60"],"img2":["0%","100"],"img3":["0%","100"]})
    },[id])
    const [imgs ,setImgs] = useState({"img1":["100%","60"],"img2":["0%","100"],"img3":["0%","100"]})
    const arrNameImg =[product.nameImg1,product.nameImg2,product.nameImg3]
    
    const mainPhoto = (num:number) => {      
       if (num == 1) {
           setImgs({"img1":["100%","60"],"img2":["0%","100"],"img3":["0%","100"]})
       }
       if (num == 2) {
           setImgs({"img1":["0%","100"],"img2":["100%","60"],"img3":["0%","100"]})
       }
       if (num == 3) {
        setImgs({"img1":["0%","100"],"img2":["0%","100"],"img3":["100%","60"]})

       }
      
    }

    return(
        <>
        
        <article id={`det`}  className="card_det">
            <section className="block_img" id="card_det"  >
                <section className="main_img">
                    <img style={{width:imgs.img1[0]}} src={product.img1} alt="" />
                    <img style={{width:imgs.img2[0]}} src={product.img2} alt="" />
                    <img style={{width:imgs.img3[0]}} src={product.img3} alt="" />
                </section>
                <section className="scroll_img">
                    <section  onClick={()=>mainPhoto(1)} >
                    <img style={{filter: `brightness(${imgs.img1[1]}%)`} }src={product.img1} alt="" />
                    </section>
                    <section style={{filter: `brightness(${imgs.img2[1]}%)`}} onClick={()=>mainPhoto(2)} >
                    <img src={product.img2} alt="" />
                    </section>
                    <section style={{filter: `brightness(${imgs.img3[1]}%)`}} onClick={()=>mainPhoto(3)} >
                    <img src={product.img3} alt="" />
                    </section>
                </section>

                {product.user == email &&
                <section className="auth_btn">

                    <button className="btn_ed"
                            onClick={()=>navigate(`/edit/product/${product.id}`)}>
                        Изменить
                    </button>
                    
                    <button className="btn_del"
                            onClick={()=>DeleteProduct(product.id,arrNameImg,dispatch,navigate)}>
                        Удалить
                    </button>

                </section>
                }

            </section>
            <section className="block_text">
                <aside className="descript_block">
                    {product.description}
                </aside>
                    <section className="price_block">
                        <p>{product.price} СОМ</p>
                    {/* <p className="text_left">{product.price}</p>
                    <p className="text_right">СОМ</p> */}
                </section> 
            </section>

        </article>
            <CardList/>
        </>
    )
}


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
    },[id])
    const [img1 ,setImg1] = useState(["100%","60"])
    const [img2 ,setImg2] = useState(["0%","100"])
    const [img3 ,setImg3] = useState(["0%","100"])
    const arrNameImg =[product.nameImg1,product.nameImg2,product.nameImg3]
    
    const mainPhoto = (num:number) => {      
       if (num == 1) {
           setImg3(["0%","100"])
           setImg2(["0%","100"])
           setImg1(["100%","60"])
       }
       if (num == 2) {
           setImg1(["0%","100"])
           setImg3(["0%","100"])
           setImg2(["100%","60"])
       }
       if (num == 3) {
           setImg1(["0%","100"])
           setImg2(["0%","100"])
            setImg3(["100%","60"])
       }
      
    }

    return(
        <>
        
        <article className="card_det">
            <section className="block_img" >
                <section className="main_img">
                    <img style={{width:img1[0]}} src={product.img1} alt="" />
                    <img style={{width:img2[0]}} src={product.img2} alt="" />
                    <img style={{width:img3[0]}} src={product.img3} alt="" />
                </section>
                <section className="scroll_img">
                    <img style={{filter: `brightness(${img1[1]}%)`}}  onClick={()=>mainPhoto(1)} src={product.img1} alt="" />
                    <img style={{filter: `brightness(${img2[1]}%)`}}  onClick={()=>mainPhoto(2)} src={product.img2} alt="" />
                    <img style={{filter: `brightness(${img3[1]}%)`}}  onClick={()=>mainPhoto(3)} src={product.img3} alt="" /> 
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
                <aside>
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
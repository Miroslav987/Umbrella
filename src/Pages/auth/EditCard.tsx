import { useEffect, useState } from "react"
import video from "../../animation/loading.webp"
import { useAppSelector } from "../../hooks/redux"
import { EditProduct, GetOneProduct } from "../../Store/servers/ProductServer"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ProductsState } from "../../Store/slices/ProductsSlice"
import { Loading } from "../../Components/Loading"

export interface objImgState{
    nameImg1:string | null,
    nameImg2:string | null,
    nameImg3:string | null
}

export const EditCard =()=> {
    const {id} = useParams()  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {product,isLoading} = useAppSelector(state => state.productsReducer)
    const [inValues , setInvalues] = useState<ProductsState["product"]>(product)
    let oldImg ={
        nameImg1:product.nameImg1,
        nameImg2:product.nameImg2,
        nameImg3:product.nameImg3,
    }
    const [objImg , setObjImg] = useState<objImgState>({    
        nameImg1:null,
        nameImg2:null,
        nameImg3:null
    })    

    localStorage.setItem("oldImg",JSON.stringify(oldImg) )
    

   function handleChangeImg (e:any){
        let obj = {
            ...inValues,
            [e.target.name]:e.target.files[0].name,
        }
        
        let newObjImg = {
            ...objImg,
           [e.target.name]:e.target.files,
        }
        
        setObjImg(newObjImg)
        setInvalues(obj)
    }

    function handleChange (e:any){
        let obj = {
            ...inValues,
            [e.target.name]:e.target.value,
        }
       setInvalues(obj)
    }
 
    function handleEdit(e:any){
        e.preventDefault()
        if (
            !inValues.name.trim() ||
            !inValues.price || 
            !inValues.description.trim()
        )
         {
            alert("заполните все поля")
        return
        }
        
        EditProduct(inValues, objImg, dispatch,navigate)
    } 
    
    
    useEffect(()=>{
        GetOneProduct(id,dispatch)
    },[id])

    useEffect(()=>{
        setInvalues(product)
    },[product])


    return(
    <>
    
    <article className="add_edit_card container">
            <h2>Изменить товар</h2>
    {!isLoading  &&  <Loading/>}
    {isLoading && 
            <form onSubmit={e => handleEdit(e)}>

                <input type="text"
                 name="name"
                 placeholder="имя"
                 value={inValues.name.toLowerCase()}
                 onChange={handleChange}
                />

                <input
                  name="price"
                  type="number"
                  placeholder="цена"
                  multiple
                  value={inValues.price}
                  onChange={handleChange}
                />
                
                <label htmlFor="img1">
                {inValues.nameImg1  && `Выбрано  : ${inValues.nameImg1}`} 
                {!inValues.nameImg1 && "Выберите главное фото" }
                    <input 
                        id="img1" type="file"
                        name="nameImg1"
                        className="file_input" 
                        accept="image/jpg, image/jpeg"
                        onChange={handleChangeImg}
                     />
                 </label>

                 <div className="blockImg_inp">

                    <label htmlFor="img2">
                    {inValues.nameImg2 && `Выбрано: ${inValues.nameImg2}`} 
                    {!inValues.nameImg2 && "Выберите фото"} 
                        <input id="img2" type="file"
                        name="nameImg2"
                         accept="image/jpg, image/jpeg"
                        onChange={handleChangeImg}
                        />
                    </label>

                    <label htmlFor="img3">
                    {inValues.nameImg3 && `Выбрано: ${inValues.nameImg3}`} 
                    {!inValues.nameImg3 && "Выберите фото"} 
                        <input id="img3" type="file"
                        name="nameImg3"
                        accept="image/jpg, image/jpeg"
                        onChange={handleChangeImg}
                        />
                    </label>

                </div>
                
                <textarea 
                name="description"
                value={inValues.description}
                placeholder="описание"
                  onChange={handleChange} />
            <button type="submit">Изменить</button>
            </form>
    }
    </article>
        
    </>)
}
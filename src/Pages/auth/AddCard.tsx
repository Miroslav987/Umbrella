import "../../styles/Add_EditCard.scss"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../hooks/redux"
import { AddProduct } from "../../Store/servers/ProductServer"
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
// import video from "../../animation/loading.gif"
import video from "../../animation/loading.webp"
import { Loading } from "../../Components/Loading"

export const AddCard =()=> {
  const {email,} = useAppSelector(state=>state.userReducer)
  const {isLoading} = useAppSelector(state=>state.productsReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] =useState("")
    const [price, setPrice] =useState("")
    const [img1, setImg1] =useState<File | null |any>("")
    const [img2, setImg2] =useState<File | null |any>("")
    const [img3, setImg3] =useState<File | null |any>("")
    const [description,setDescription] =useState("")


   const handleAdd=(e:any)=>{
    e.preventDefault()
    if (
        !name.trim() ||
        !price.trim() || 
        !description.trim()||
        img1[0] == undefined||
        img2[0] == undefined||
        img3[0] == undefined
    )
     {
        alert("заполните все поля")
    return
    }
        let obj:any = {
        name:name.toLowerCase(),
        nameImg:[img1[0].name,img2[0].name,img3[0].name],
        // nameImg1,
        // nameImg2,
        // nameImg3,
        price:price,
        description:description,
        user:email,
        id:v4()
        }

        let imagesArr =[img1,img2,img3];

        AddProduct(obj, imagesArr,navigate, dispatch)    
   }


    return( 
    <>
        <article className="add_edit_card container">
            <h2>Добавить товар</h2>
        {!isLoading  &&  <Loading/>}
        {isLoading && 
            <form onSubmit={e => handleAdd(e)}>

                <input type="text"
                 placeholder="имя"
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="цена"
                  multiple
                  value={`${price}`}
                  onChange={(e)=>setPrice(e.target.value)}
                />
                
                <label htmlFor="img1">
                    {img1 && `Главное фото выбрано: ${img1[0].name}`} 
                    {!img1 && "Выберите главное фото"} 
                    <input 
                        id="img1" type="file"
                        className="file_input" 
                        accept="image/jpg, image/jpeg"
                        onChange={(e)=>setImg1(e.target.files)}
                     />
                 </label>

                 <div className="blockImg_inp">

                    <label htmlFor="img2">
                    {img2 && `Выбрано: ${img2[0].name}`} 
                    {!img2 && "Выберите фото"} 
                        <input id="img2" type="file"
                         accept="image/jpg, image/jpeg"
                        onChange={(e)=>setImg2(e.target.files)}
                        />
                    </label>

                    <label htmlFor="img3">
                    {img3 && `Выбрано: ${img3[0].name}`} 
                    {!img3 && "Выберите фото"} 
                        <input id="img3" type="file"
                        accept="image/jpg, image/jpeg"
                        onChange={(e)=>setImg3(e.target.files)}
                        />
                    </label>

                </div>
                
                <textarea  
                placeholder="описание"
                className="input_description"
                  onChange={(e)=>setDescription(e.target.value)} />
            <button type="submit">Добавить</button>
            </form>
        }

      </article>

    </>)
}
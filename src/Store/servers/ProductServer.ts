import { collection, deleteDoc, doc, getDoc, getDocs,  query,  setDoc, updateDoc, where } from "firebase/firestore"
import {  LoadingProducts, SetOneProducts, SetProducts } from "../slices/ProductsSlice";
import { AppDispatch } from "../store";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { db,storage } from "../../Firebase/Config";



export const SearchProduct = async(search:string,dispatch:AppDispatch,navigate:Function)=>{
    try {
        dispatch(LoadingProducts(false))
        const q = query(collection(db, 'products'), where('name', '>=', search), where('name', '<=', search+ '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        dispatch(SetProducts(data))
        navigate('/')
    } catch (error) {
        console.log(error);
        
    }
}

export const GetProduct = async(dispatch:AppDispatch)=>{
    try {
      
        
        const data = await getDocs(collection(db, "products"));
        const products = data.docs.map(doc => ({
            ...doc.data()
        }));
        
        dispatch(SetProducts(products))
        
    } catch (error) {
        console.log(error);
    }
} 

export const GetOneProduct = async(id:any,dispatch:AppDispatch)=>{
    try {
        
        const data = doc(db, `products/${id}`)
        const  oneProduct = await getDoc(data);
        dispatch(SetOneProducts(oneProduct.data()))
        
    } catch (error) {
        console.log(error);
    }
} 

export const AddProduct = async (obj:any,imagesArr:any,navigate:Function, dispatch:AppDispatch)=>{
    const imgArr:any = []
    
    dispatch(LoadingProducts(false))
    try {
        for (let i = 0; i < imagesArr.length; i++) {
            const newImgArr:string = imagesArr[i];
            
            for (let i = 0; i < newImgArr.length; i++) {
                const img:any = newImgArr[i];
                const imageFef = ref(storage,`images:${obj.id}/${img.name}`);
                await uploadBytes(imageFef,img);
              
                const imageUrl = await getDownloadURL(imageFef);
                
                    imgArr.push(imageUrl)
                
                if (imgArr.length ==3) {
                    const data = await setDoc(doc(db,"products",obj.id), {
                        name:obj.name,
                        price:obj.price,
                        description:obj.description,
                        user:obj.user,
                        id:obj.id,
                        nameImg1:obj.nameImg[0],
                        nameImg2:obj.nameImg[1],
                        nameImg3:obj.nameImg[2],
                        img1:`${imgArr[0]}`,
                        img2:`${imgArr[1]}`,
                        img3:`${imgArr[2]}`,
                    });
                }
            }
        }
        GetProduct(dispatch)
        navigate("/")
    } catch (error) {
        console.log("error",error);
    }
} 

export const DeleteProduct = async (id:string,nameImg:string[],dispatch:AppDispatch,navigate:Function )=> {
    try {
        for (let i = 0; i < nameImg.length; i++) {
            const imageFef = ref(storage,`images:${id}/${nameImg[i]}`);
            await deleteObject(imageFef)
        
            const docRef = doc(db, 'products', id);
            await deleteDoc(docRef);
        GetProduct(dispatch)
        }

        navigate("/my_profile")
      } catch (error) {
        console.log("error",error);
      } 
    };

export const EditProduct = async (obj:any,objImg:any,dispatch:AppDispatch,navigate:Function )=> {
    const updateImgStorage = localStorage.getItem("oldImg");
    dispatch(LoadingProducts(false))
    if (updateImgStorage ) {
        const oldImg:any = JSON.parse(updateImgStorage)
        
    try {
        if (objImg.nameImg1 !== null) {
            const imageOldFef1 =ref(storage, `images:${obj.id}/${oldImg.nameImg1}`)
            await deleteObject(imageOldFef1)
            const imageFef = ref(storage,`images:${obj.id}/${obj.nameImg1}`);
            await uploadBytes(imageFef,objImg.nameImg1[0]);
            const imageUrl = await getDownloadURL(imageFef);
            obj.img1 =imageUrl
            const docRef = doc(db, 'products', obj.id);
            await updateDoc(docRef,obj);
        }
        if (objImg.nameImg2 !== null) {
            const imageOldFef2 =ref(storage, `images:${obj.id}/${oldImg.nameImg2}`)
            await deleteObject(imageOldFef2)
            const imageFef2 = ref(storage,`images:${obj.id}/${obj.nameImg2}`);
            await uploadBytes(imageFef2,objImg.nameImg2[0]);
            const imageUrl2 = await getDownloadURL(imageFef2);
            obj.img2 =imageUrl2
            const docRef2 = doc(db, 'products', obj.id);
            await updateDoc(docRef2,obj);
        }
        if (objImg.nameImg3 !== null) {
            const imageOldFef3 =ref(storage, `images:${obj.id}/${oldImg.nameImg3}`)
            await deleteObject(imageOldFef3)
            const imageFef3 = ref(storage,`images:${obj.id}/${obj.nameImg3}`);
            await uploadBytes(imageFef3,objImg.nameImg3[0]);
            const imageUrl3 = await getDownloadURL(imageFef3);
            obj.img3 =imageUrl3
            const docRef3 = doc(db, 'products', obj.id);
            await updateDoc(docRef3,obj);
        } 
        
        const docRef = doc(db, 'products', obj.id);
        await updateDoc(docRef,obj);
        
        GetProduct(dispatch)
        localStorage.setItem("oldImg","")
        navigate("/my_profile") 
      } catch (error) {
        console.log("error",error);
      } 
    };
}





import "../../styles/MyProfile.scss"
import ava from "../../icon/user.png"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { signOutAccount } from "../../Store/servers/AuthServer"
import { useNavigate } from "react-router-dom"
import { MyCardList } from "../../Components/MyCardList"
export const MyProfile =()=> {
    const {email,img} = useAppSelector(state =>state.userReducer)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const myCard = "Мои товары"
    return(
    <>
        <article className="my_profile">
            <section className="my_info">
                <section className="block_one">
                <img src={img? img :ava} alt="" />
                    <h2>{email}</h2>
                </section>

                <section className="block_two">
                <button onClick={()=>signOutAccount(dispatch,navigate)}>
                 Выйти из аккаунта
                </button>
                <button onClick={()=>navigate("/add/product")} >
                    Добавить свой товар
                </button>
                </section>
            </section>

            <section className="my_card"> 
                <h2>Мои товары</h2>
                <MyCardList email={email}/>
            </section>
        </article>
    </>
    )
}
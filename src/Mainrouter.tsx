import { Route,  Routes } from "react-router-dom"
import { SignIn } from "./Pages/SignIn"
import { SignUp } from "./Pages/SignUp"
// import { CardList } from "./Pages/CardList"
import { CardDetails } from "./Pages/CardDetails"
import { MyProfile } from "./Pages/auth/MyProfile"
import { CardList } from "./Components/CardList"
import { AddCard } from "./Pages/auth/AddCard"
import { EditCard } from "./Pages/auth/EditCard"
import { SearchAndCardList } from "./Pages/SearchAndCardList"

const Mainrouter =()=>{
    return(
        <Routes>
            <Route path="/" element={<SearchAndCardList/>} />
            <Route path="/sign_in" element={<SignIn/>} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/add/product" element={<AddCard />} />
            <Route path="/edit/product/:id" element={<EditCard/>} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/card/details/:id" element={<CardDetails/>} />
            <Route path="/my_profile" element={<MyProfile/>} />
        </Routes>
        )
}
export default Mainrouter;
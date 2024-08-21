import axios from "axios";
import { AppDispatch } from "../store";
import { removeUser, setUser } from "../slices/UserSlice";
import { 
  AuthCredential,
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { auth } from "../../Firebase/Config";

// ? Регистрация через email

  export const createAccount = async (email:string, pass:string, dispatch:AppDispatch,navigate:Function) => {
    try {
      await createUserWithEmailAndPassword(auth ,email ,pass);
      SignInAccount(email,pass,dispatch,navigate)
      navigate("/sign_in")
    } catch (error) {
      handleFirebaseError(error)
    }
};

// ! Регистрация через email

// ? Вход через email

  export const SignInAccount = async (email:string,pass:string,dispatch: AppDispatch,navigate:Function)=> {
    try {
      await setAuthPersistence(browserSessionPersistence);
      const {user} = await signInWithEmailAndPassword(auth ,email ,pass);

      checkAuthState(auth,dispatch)
      dispatch(setUser(user))
      navigate("/")

    } catch (error) {
      handleFirebaseError(error)

    }
  }

// ! Вход через email

// ? Вход через Google

  export const handleGoogle = async (dispatch: AppDispatch,navigate:Function) => {
    const provider =  new GoogleAuthProvider()
    try {
      await setAuthPersistence(browserLocalPersistence);
      const {user}= await signInWithPopup(auth,provider)
      // localStorage.setItem("entered","true")
      checkAuthState(auth,dispatch)
      dispatch(setUser(user))
      navigate("/")
    } catch (error) {
      handleFirebaseError(error)
    }
  };

// ! Вход через Google  

// ? Проверка входа

  export const checkAuthState = (auth:any,dispatch:AppDispatch)=>{
    onAuthStateChanged(auth,(user) => {
      if (user) {
        dispatch(setUser(user))
        // console.log(user);
        
      }else{
        console.error("пользователь не войден");
        
      }
      
    })
  }

// ! Проверка входа  

// ? Сохранения входа

  async function setAuthPersistence(persistenceType:any) {
    try {
      await setPersistence(auth , persistenceType);
      console.log('Persistence set to:', persistenceType);
    } catch (error) {
      console.error('Error setting persistence:', error);
    }
  }

// ! Сохранения входа


// ? Выход из аккаунта

  export const signOutAccount = async (dispatch:AppDispatch,navigate:Function)=>{
    try {
      await signOut(auth)
      localStorage.setItem("entered","false")
      dispatch(removeUser())
      navigate("/")
    } catch (error) {
      console.log(error);
      
      
    }
  }

// ! Выход из аккаунта


// ? Обработка ошибок

  const handleFirebaseError =(error:any)=> {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error code:', errorCode);
    console.error('Error message:', errorMessage);
  
    // обработка ошибок
    switch (errorCode) {
      case 'auth/user-not-found':
        alert('Пользователь не найден. Пожалуйста, проверьте свою электронную почту и повторите попытку.');
        break;
      case 'auth/wrong-password':
        alert('Неправильный пароль. Пожалуйста, попробуйте еще раз.');
        break;
      case 'auth/invalid-email':
        alert('Неверный формат электронной почты.');
        break;
      case 'auth/user-not-found':
        alert(' Учетная запись пользователя не найдена.');
        break;
      case 'auth/wrong-password':
        alert('Неверный пароль.');
        break;
      case 'auth/email-already-in-use':
        alert('Этот email уже используется другой учетной записью.');
        break;
      case 'auth/weak-password':
        alert('Пароль слишком слабый.');
        break;
      case 'auth/invalid-email':
        alert('Неверный формат электронной почты.');
        break;
      case 'auth/invalid-email':
        alert('Неверный формат электронной почты.');
        break;
      default:
        alert('Произошла неизвестная ошибка. Пожалуйста, повторите попытку позже.');
    }
  }

  
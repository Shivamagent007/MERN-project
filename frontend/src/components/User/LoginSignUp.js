import React, {useEffect, useState} from 'react'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Redirect } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { loadUser } from '../../redux/userSlice';



const LoginSignUp = ({history}) => {
    const [tab, setTab] = useState("login");

    const handleTabChange = (tab) => {
      setTab(tab);
    };

    const {isAuthenticated} = useSelector((state)=> state.users)
    if (isAuthenticated){
        history.push("/account")
    }
    return (
        <>
            <div className="pt-32 bg-white">
                <h1 className="text-center text-2xl font-bold text-gray-800">All Products</h1>
                <h1 className="text-center text-l font-bold text-gray-800">hello my name is gomak</h1>
                <section className="py-10 bg-gray-100">
                    <div className="mx-auto max-w-6xl p-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <button
                                className={`${tab === "login" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
                                    } py-2 rounded`}
                                onClick={() => handleTabChange("login")}
                            >
                                Login
                            </button>
                            <button
                                className={`${tab === "register" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
                                    } py-2 rounded`}
                                onClick={() => handleTabChange("register")}
                            >
                                Register
                            </button>
                        </div>
                        {tab === "login" ? <LoginForm /> : <RegisterForm />}
                    </div>
                </section>
            </div>
        </>
  )
}


export default LoginSignUp
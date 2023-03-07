/**Ganna email password
 * uselogin eken login,error,isloading ganna
 * hsndle the submit
 * 
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";


const LoginPage = () => {
    const [email,setEmail]  = useState('')
    const [password,setPassword] = useState('')
    const {login,error,isLoading} = useLogin()
    const navigate = useNavigate();
    const handleSubmit =async (e)=>{
        e.preventDefault()
        await login(email,password)
        navigate('/')
    }
    return (  
        <form action="" className="register" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input type="password" name="" id="" placeholder="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button>Login</button>
            {error &&<div>{error.message}</div>}
            <Link to="/register">Haven't account? Register </Link>
        </form>
    );
}
 
export default LoginPage;
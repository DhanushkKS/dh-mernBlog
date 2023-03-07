import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
const RegisterPage = () => {
    const [email,setEmail]  = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const {register,error,isLoading} = useRegister()
    const navigate = useNavigate()
    const handleSubmit =async (e)=>{
        e.preventDefault()
        await register(email,password,confirmPassword)
        navigate('/')

    }
    return (  
        <form action="" className="register" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input type="text" placeholder="email" onChange={e=>setEmail(e.target.value)} value={email}/>
            <input type="password" name="" id="" placeholder="password" onChange={e=>setPassword(e.target.value)} value={password} />
            <input type="password" name="" id="" placeholder="confirm password" onChange={e=>setConfirmPassword(e.target.value)} value={confirmPassword} />
            <button>Register</button>
            <Link to='/login'>Alrady a member? log in</Link>
        </form>
    );
}
 
export default RegisterPage;
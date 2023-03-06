import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
const RegisterPage = () => {
    const [email,setEmail]  = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const {register,error,isLoading} = useRegister()
    const handleSubmit =async (e)=>{
        e.preventDefault()
        await register(email,password,confirmPassword)
    }
    return (  
        <form action="" className="register" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input type="text" placeholder="email" onChange={e=>setEmail(e.target.value)} value={email}/>
            <input type="password" name="" id="" placeholder="password" onChange={e=>setPassword(e.target.value)} value={password} />
            <input type="password" name="" id="" placeholder="confirm password" onChange={e=>setConfirmPassword(e.target.value)} value={confirmPassword} />
            <button>Register</button>
        </form>
    );
}
 
export default RegisterPage;
/** meke frontend eken login functionality eka handle karanwa
 *  error,isloading kiyala state 2k hadanna
 * AuthContext eken dispatch eka ganna, methana thamai fetch karanne
 * email,password parameters widiyata dila login function ekahadanna
 *      responce eka hadanna 
 *      responce eken ena json eka ganna
 *      responce eka ok nam local storge ekata user wa save karanna
 *      dispach eken Auth context eka update krnn 
 *      login ekai, isloadin ekai,error ekai return karanna
 */

import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import axios from 'axios';
export const useRegister = ()=>{
    const [error,setError] = useState(null)
    const [isloading,setIsLoading]=useState(null)
    const {dispatch} = useAuthContext();
    const register = async (email,password,confirmPassword)=>{
       await axios.post('http://localhost:5555/api/user/register',{email,password,confirmPassword},{
            headers:{'Content-Type':'application/json'}
        }).
        then(responce=>{

           
            localStorage.setItem('blog-user',JSON.stringify(responce.data))
            dispatch({type:'LOGIN',payload:responce.data})
            setIsLoading(false);  
            console.log(responce)})

            .catch(error=>{
                setIsLoading(true)
                setError(error)
                console.log('error in useRegister, note from dhanushka ',error.message);
            });
            
    }
    return{register,error,isloading}
}    
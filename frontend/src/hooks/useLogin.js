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
export const useLogin = ()=>{
    const [error,setError] = useState(null)
    const [isloading,setIsLoading]=useState(null)
    const {dispatch} = useAuthContext();
 
    const login = async (email,password)=>{
       await axios.post('http://localhost:5555/api/user/login',{email,password},{
            headers:{'Content-Type':'application/json'}
        }).
        then(responce=>{

           
            localStorage.setItem('user',JSON.stringify(responce.data))
            dispatch({type:'LOGIN',payload:responce.data})
            setIsLoading(false);  
            console.log(responce)})

            .catch(error=>{
                setIsLoading(true)
                setError(error)
                console.log('error in uselogin, log from dhanushka ',error.message);
            });
            
    }
    return{login,error,isloading}
}    
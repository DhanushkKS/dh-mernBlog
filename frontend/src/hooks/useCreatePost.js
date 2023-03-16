import axios from "axios"
import { Navigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"
import { usePostContext } from "./usePostContext"

/**front end eken create post functionality eka habadawa
 * postcontext eken dispatch eka ganna
 * title,summary,content,cover param widyt dila createPost mtd ek hdnn
 * 
 */
export const useCreatePost = ()=>{
    const {dispatch} = usePostContext()
    const {user} = useAuthContext()
    const createPost= async(data)=>{
        await axios.post('http://localhost:5555/api/blog-post/create-post',data,{
            headers:{
                'Content-Type':'applcation/json',
                'Authorization':   `Bearer ${user.token}`
            }
        })
        .then(res=>{
            dispatch({type:'CREATE_POST',payload:res.data})
            console.log('responce is ',res.data);
        })
        .catch(err=>{
            console.log('error in useCreatePost, log from dhanushka ',err);

        })
    }
    const updatePost = async(data,id)=>{
        await axios.patch('http://localhost:5555/api/blog-post/posts/'+id,data,{
            headers:{'Content-Type':'applcation/json',
            'Authorization':   `Bearer ${user.token}`
        
        }}).then(res=>{
            dispatch({type:'CREATE_POST',payload:res.data})    
        console.log("update success post "+ id);
            return(
                <Navigate to ={'/'}/>
            )
        }).catch (err=>{
            console.log("some err happened with post update, "+ err.message);
            
        })
    }
    return{createPost,updatePost}
}

import axios from "axios"
import { usePostContext } from "./usePostContext"

/**front end eken create post functionality eka habadawa
 * postcontext eken dispatch eka ganna
 * title,summary,content,cover param widyt dila createPost mtd ek hdnn
 * 
 */
export const useCreatePost = ()=>{
    const {dispatch} = usePostContext()
    const createPost= async(data)=>{
        await axios.post('http://localhost:5555/api/blog-post/create-post',data,{
            headers:{'Content-Type':'applcation/json'}
        })
        .then(res=>{
            dispatch({type:'CREATE_POST',payload:res.data})
            console.log('responce is ',res.data);
        })
        .catch(err=>{
            console.log('error in useCreatePost, log from dhanushka ',err);

        })
    }
    return{createPost}
}
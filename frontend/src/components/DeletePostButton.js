import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { usePostContext } from "../hooks/usePostContext";

const DeletePostButton = (props) => {

    const {dispatch} = usePostContext()
    const navigate = useNavigate();
    const deletePost = ()=>{
            console.log('deleted post ', props._id);
            axios.delete('http://localhost:5555/api/blog-post/posts/'+props._id)
            .then(
                (res)=>{
                    console.log('delete success ',res.data)
                    dispatch({type:'DELETE_POST',payload:res.data})
                   navigate('/')
                })
            .catch(err=>console.log(err))
          
    }
    return (  
        <div>
          <button onClick={deletePost}>Delete post</button>  
        </div>
    );
}
 
export default DeletePostButton;
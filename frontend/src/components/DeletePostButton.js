import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";

const DeletePostButton = (props) => {
    const {user} = useAuthContext()
    const {dispatch} = usePostContext()
    const navigate = useNavigate();
    const deletePost = ()=>{
            console.log('deleted post ', props._id);
            axios.delete('http://localhost:5555/api/blog-post/posts/'+props._id,
           {
             headers:{
                'Authorization':   `Bearer ${user?.token}`
              }}
            )
            .then(
                (res)=>{
                    console.log('delete success ',res.data)
                    dispatch({type:'DELETE_POST',payload:res.data})
                   navigate('/')
                })
            .catch(err=>console.log(err))
          
    }
    return (  
        <div className="deletepost">
          <button onClick={deletePost}title="Delete post"><ion-icon name="trash-outline" size="large"></ion-icon></button>  
        </div>
    );
}
 
export default DeletePostButton;
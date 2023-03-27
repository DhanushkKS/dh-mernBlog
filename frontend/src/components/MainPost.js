import axios from "axios";
import { useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import DeletePostButton from "./DeletePostButton";
import UpdatePostButton from "./UpdatePostButton";
import jwt_decode from "jwt-decode"

const MainPost = () => {
  const {user}  = useAuthContext()
    const { id } = useParams()
    const { post, dispatch } = usePostContext()
    const token = user.token
    const deco = jwt_decode(token)


    useEffect(() => {
        const fecthSinglePost = async () => {
            await axios.get(`http://localhost:5555/api/blog-post/posts/${id}`,{
              headers:{
                'Authorization':   `Bearer ${user.token}`
              }
            })
                .then(r => {
                    console.log(r.data)
                    dispatch({ type: 'SET_SINGLE_POST', payload: r.data })
                })
                .catch(err => console.log(err.message))
        }
        if(user){
          fecthSinglePost();
        }
        
    }, [id,dispatch,user])

   const url = post?.cover
   const urlParts = url?.split('\\');
   const fileName = urlParts?.[urlParts.length-1];
   const coverImgUrl =  `http://localhost:5555/uploads/${fileName}`

    return (
        
        post && (
            <div className="post">
            <div className="image">
              <img src={coverImgUrl} alt="blog_img" />
              {
                  (post.user_id===deco._id)?
                  
                  <>
                  <DeletePostButton _id = {post._id}/>
                   <Link to={`/posts/edit/${post._id}`}>Edit post</Link>
                  </>
                  :''
              }
             
             
              {/* <Link to = {{pathname:'/posts/edit/'+post._id, state:{post}}}>Edit post</Link> */}
            </div>
            <div className="texts">
              <h2>{post.title}</h2>
              <p className="info">
                <a href="#" className="author">{post.author_nickname}</a>
                <time>2023-03-03 08.00</time>
              </p>
              <div dangerouslySetInnerHTML={{__html:post.content}}/>
              
            </div>
          </div>
        )
    );
}

export default MainPost;
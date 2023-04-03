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
  const getusr = localStorage.getItem('user')
    const { id } = useParams()
    const { post, dispatch } = usePostContext()
    const usr =  JSON.parse(getusr)
     const token = usr.token
     const deco = jwt_decode(token)
  // console.log('usr',usr);
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
        
    }, [user])

   const url = post?.cover
   const urlParts = url?.split('\\');
   const fileName = urlParts?.[urlParts.length-1];
   const coverImgUrl =  `http://localhost:5555/uploads/${fileName}`

    return (
        
        post && (
          <div className="mainpost-container">

            <div className="main-post">
            <div className="mainpost-image">
              <img src={coverImgUrl} alt="blog_img" />
             
             
              {/* <Link to = {{pathname:'/posts/edit/'+post._id, state:{post}}}>Edit post</Link> */}
            </div>
            <div className="mainpost-texts">
              {
                (post.user_id===deco._id)?
                
                <div className="editpost">
                  <DeletePostButton _id = {post._id}/>
                   <Link to={`/posts/edit/${post._id}`}>Edit post</Link>
                  </div>
                  :''
                }

              <h2>{post.title}</h2>
              <p className="mainpost-info">
                <a href="#" className="author">{post.author_nickname}</a>
                <time>2023-03-03 08.00</time>
              </p>
              <div dangerouslySetInnerHTML={{__html:post.content}}/>
              
            </div>
          </div>
        </div>
        )
    );
}

export default MainPost;
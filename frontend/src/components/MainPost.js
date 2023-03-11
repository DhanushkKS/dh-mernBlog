import axios from "axios";
import { useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { usePostContext } from "../hooks/usePostContext";

const MainPost = () => {
    const { id } = useParams()
    const { post, dispatch } = usePostContext()
    useEffect(() => {
        const fecthSinglePost = async () => {
            await axios.get(`http://localhost:5555/api/blog-post/posts/${id}`)
                .then(r => {
                    console.log(r.data)
                    dispatch({ type: 'SET_SINGLE_POST', payload: r.data })
                })
                .catch(err => console.log(err.message))
        }
        fecthSinglePost();
    }, [id,dispatch])

     const url = post?.cover
  const urlParts = url?.split('\\');
   const fileName = urlParts?.[urlParts.length-1];
   const coverImgUrl =  `http://localhost:5555/uploads/${fileName}`

    return (
        
        post && (
            <div className="post">
            <div className="image">
              <img src={coverImgUrl} alt="blog_img" />
            </div>
            <div className="texts">
              <h2>{post.title}</h2>
              <p className="info">
                <a href="#" className="author">Dhanushka</a>
                <time>2023-03-03 08.00</time>
              </p>
              <div dangerouslySetInnerHTML={{__html:post.content}}/>
              
            </div>
          </div>
        )
    );
}

export default MainPost;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import img from './../img/raycast-untitled.png'
import DeletePostButton from './DeletePostButton';
import jwt_decode from "jwt-decode"

const Post = ({post}) => {
  const {user} = useAuthContext()
  // const {user} = useAuthContext()
  const url = post.cover
  const urlParts = url.split('\\');
  const fileName = urlParts[urlParts.length-1];

  const token = user.token
    const deco = jwt_decode(token)
     console.log("post is", post);
  /**
   * double click edit
   */

  /** */
  const coverImgUrl =  `http://localhost:5555/uploads/${fileName}`
  return (
    <div className="post">
      <div className="image">
        <img src={coverImgUrl} alt="blog_img" />
      </div> 
      <div className="texts">
        {/* <h2>{post.title}</h2> */}
        <h2><Link to ={`/posts/${post._id}`} >{post.title}</Link></h2>
        <p className="info">
          <Link to={'/user'} className="author" state={{author_id:post.user_id,nickname:post.author_nickname}} >{post.author_nickname}</Link>
          <time>2023-03-03 08.00</time>
        </p>
        <p className="summary">{post.summary}
        
        <Link to ={`/posts/${post._id}`} >See more ...</Link>
        </p>

      {
        (post.user_id===deco._id)?<DeletePostButton _id ={post._id} />:''
      }
      </div>
      
      
    </div>
  );
}

export default Post;

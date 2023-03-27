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
        <h2>{post.title}</h2>
        <p className="info">
          <a href="#" className="author">{post.author_nickname}</a>
          <time>2023-03-03 08.00</time>
        </p>
        <p className="summary">{post.summary}</p>
        <Link to ={`/posts/${post._id}`} >See more ...</Link>
      </div>
      {
        (post.user_id===deco._id)?<DeletePostButton _id ={post._id} />:''
      }
      
      
    </div>
  );
}

export default Post;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import img from './../img/raycast-untitled.png'

const Post = ({post}) => {
  // const {user} = useAuthContext()
  const url = post.cover
  const urlParts = url.split('\\');
  const fileName = urlParts[urlParts.length-1];

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
          <a href="#" className="author">Dhanushka</a>
          <time>2023-03-03 08.00</time>
        </p>
        <p className="summary">{post.summary}</p>
        <Link to ={`/posts/${post._id}`} >See more ....</Link>
      </div>
     
      
    </div>
  );
}

export default Post;

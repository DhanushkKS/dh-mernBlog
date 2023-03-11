/**mekata useEffect eka ona
 * posttcontext eka use kranna usePostcontext
 * useeffect eke backend eken fetch karala posts tika ganna
 * dispatch eka matha useeffect eka depend wenne, (dispatch eken workouts tika ganna nisa)
 */

import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { usePostContext } from "../hooks/usePostContext";

const IndexPage = () => {
    const {posts,dispatch} = usePostContext()
    useEffect(()=>{
        const fetchPosts = async()=>{
            await axios.get('http://localhost:5555/api/blog-post/posts')
            .then(responce=>{
                console.log('po sts', responce.data);
                 dispatch({type:'SET_POSTS',payload:responce.data})
            })
            .catch(error=>{
                console.log('error happened in get all posts _by dhaushka',error.message);
            })  
        }
        fetchPosts()
    },[dispatch])
    return posts.length ? ( 
        /**dan
         * 
         */
        <>
        <div className="posts">
           {
            posts && posts.map((post)=>{
                return (
                    <Post key={post._id} post={post}/>
                )
            })
           }
        
        </div>
        
        </>
     ):(
        <div>No posts found would you like to create a<Link to='/create'>post?</Link> </div>
     );
}
 
export default IndexPage;
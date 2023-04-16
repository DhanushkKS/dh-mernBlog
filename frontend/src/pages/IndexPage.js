/**mekata useEffect eka ona
 * posttcontext eka use kranna usePostcontext
 * useeffect eke backend eken fetch karala posts tika ganna
 * dispatch eka matha useeffect eka depend wenne, (dispatch eken workouts tika ganna nisa)
 */

import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import styled, { css, keyframes } from 'styled-components'
const IndexPage = () =>{

    const {user} = useAuthContext()
    const {posts,dispatch} = usePostContext()
    
    // const BackgroundCircles = ({ count }) => {
        
    //    const animations = [];
    //    for (let index = 0; index < count;index++) {
    //     animations[index] = index+Math.floor(Math.random()*100);
        
    //    }
    //    const circls= animations.map((animationValue)=>{
    //     const trr = animationValue
    //     const animate = keyframes
    //     0%,100%{
    //     transform: translateY(${trr});
    //      }
    //      50%{
    //      transform: translateY(${trr});
    //       }
    //     `
    //     return animate
    //    })

    //     const circles = Array.from({ length: count }, (_, index) => (
        
    //         <span key={index} className="background-circle"
    //       style={{
    //         position: 'absolute',
    //         width: `3px`,
    //         height: `3px`,  
    //          borderRadius: `50%`,
    //          background: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
    //          background:`linear-gradient(
    //               ${Math.floor(Math.random()*361)}deg ,
    //               rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}) ,
    //               rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})     
    //               )`,
                  
    //          transform: `translate(${ Math.floor( Math.random()*1400)}px,${ Math.floor( Math.random()*1000)}px)`,
    //          margin:'10px',
    //         //  animation: `animate 10s linear infinite`,
    //          animationDelay: `calc(-1s * var(--i))`
    //       }}
          
    //       >
           
    //       </span>
       
    //     ));
      
    //     return <div class="background-circles"
    //     style={{
    //         maxWidth:'100vw',
    //         overflow:'hidden'
    //     }}
        
    //     >{circles}</div>;
    //   };
    const BackgroundCircle = styled.span`
  position: fixed;
  
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
  background: linear-gradient(
    ${props => Math.floor(Math.random() * 361)}deg,
    rgb(${props => Math.floor(128+Math.random() * 128)}, ${props => Math.floor(128+Math.random() * 128)}, ${props => Math.floor(128+Math.random() * 128)}),
    rgb(${props => Math.floor(128+Math.random() * 128)}, ${props => Math.floor(128+Math.random() * 128)}, ${props => Math.floor(128+Math.random() * 128)})
  );
 
  animation: ${props => props.animation } 30s linear infinite;
  animation-delay: ${props => `calc(-1s * ${props.index}))`};
  box-shadow : 0px 0px 20px rgba(0,0,0,0.8); 
  
`;
    const BackgroundCircles = ({ count }) => {
  const animations = [];
  for (let index = 0; index < count; index++) {
    animations[index] = index + Math.floor(Math.random() * 1000);
  }
  
  const circls = animations.map((animationValue) => {
    const trr = animationValue;
    const animate = keyframes`
        0%,100%{
        transform: translateY(${trr}px);
        
         }
         50%{
         transform: translateY(${trr*1.4}px) ;
          }
        `;
    // const anime = props=> css`
    // ${animate}  ${props.animateLength}  linear infinite;
    
    // `
    return animate

  });

  const circles = Array.from({ length: count }, (_, index) => (
    <BackgroundCircle key={index} index={index} animation={circls[index]} style={{
      
        top: `${Math.floor(Math.random()*100)}px`,
        left:`${Math.floor(Math.random()*1440)}px`,
        opacity : `${0.1+Math.random()}`
    }} />
          

  ));

  return (
    <div
      className="background-circles"
      style={{
      
        maxWidth: "100vw",
        overflow: "hidden"
      }}
    >
      {circles}
    </div>
  );
};

    useEffect(()=>{
          
        const fetchPosts = async()=>{
            await axios.get('http://localhost:5555/api/blog-post/posts',{
                headers:{
                    'Authorization':   `Bearer ${user.token}`
                  }
            })
            .then(responce=>{
                console.log('po sts', responce.data);
                 dispatch({type:'SET_POSTS',payload:responce.data})
            })
            .catch(error=>{
                console.log('error happened in get all posts _by dhaushka',error.message);
            })  
        }
        if(user){
            fetchPosts()

        }
        fetchPosts()
    },[dispatch,user])
    return posts.length ? ( 
        /**dan
         * 
         */
        <>
       <BackgroundCircles count={10}/>
      
        
        <div className="posts">
           {
            posts && posts.map((post)=>{
                return (
                  <>
                    <Post key={post._id} post={post}/>
                    <Post key={post._id} post={post}/>
                    <Post key={post._id} post={post}/>
                  </>
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
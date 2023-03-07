import { createContext, useReducer } from "react";

export const PostConext = createContext();
export const postReducer = (state,action)=>{
    switch(action.type){
        case 'SET_POSTS':
            return{
                posts:action.payload
            
        }
        case 'SET_SINGLE_POST':
            return{
                posts:state.posts.filter((p)=>p._id==action.payload._id)
            }
        case 'CREATE_POST','EDIT_POST':
            return{
                posts:[action.payload,...state.workouts]
            }
        default :
        return state
    }
}
export const PostContextProvider = ({childern})=>{
    const [state,dispatch]  =useReducer(postReducer,{posts:null})
    return(
        <PostConext.Provider value={{...state,dispatch}}>
            {childern}
        </PostConext.Provider>
    );
}
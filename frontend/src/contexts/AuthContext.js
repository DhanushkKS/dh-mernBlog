/**
 * (1) context eka hadanna
 * (2) context Provider wa hadanna
 * (2.1) reducer eka use karanna
 * (2.2) useeffect eken dant inn userw load kr ganna local strage eken
 * (4) context.provider wa return karanna 
 * (5) authreducer eka hadanna
 * ///context,dispatch,consume aai balanna 
 */

import {createContext, useEffect, useReducer} from 'react'
/** (1) */
export const AuthContext = createContext();
/** (5) */
export const authReducer = (state,action)=>{
    switch(action.type){
        case 'REGISTER':
            return {user:action.payload}
        case 'LOGIN' :
            return {user:action.payload}
        case 'LOGOUT':
            return {user:null}
        default:
            return state;
    }
}

/**(2) */
export const AuthContextProvider = ({children})=>{
    /** (2.1) */
    const [state,dispatch] = useReducer(authReducer,{user:null}) 
    /**
     * useReducer hook
     * const [state, dispatch] = useReducer(reducer, initialArg, init?)
     * params
     * ########
     *  reducer: 
     * The reducer function that specifies how the state gets updated. 
     * It must be pure, should take the state and action as arguments, 
     * and should return the next state. State and action can be of any types.
     * 
        initialArg: 
        The value from which the initial state is calculated. 
        It can be a value of any type. 
        How the initial state is calculated from it depends on the next init argument.
        
        optional init: 
        The initializer function that specifies how the initial state is calculated. 
        If it’s not specified, the initial state is set to initialArg. 
        Otherwise, the initial state is set to the result of calling init(initialArg).
     
        returns ;
        
        */
    
    /** (2.2) */
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:'LOGIN',payload:user})
        }
    },[])

    console.log('Auth context status',state);
    return(
        /**(4) */
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}
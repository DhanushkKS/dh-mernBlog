import { AuthContext } from "../contexts/AuthContext"

/**authcontext eken dispatch krala logout eka call karanna  */
export const useLogOut = ()=>{
    const {dispatch} = AuthContext()
    const logout = ()=>{
        //remove user from local storage
        localStorage.removeItem('blog-user')
        //dispatch logout action
        dispatch({type:'LOGOUT'})
    }
    return { logout}
}
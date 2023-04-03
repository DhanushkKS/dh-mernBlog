import { useAuthContext } from "./useAuthContext"

/**authcontext eken dispatch krala logout eka call karanna  */
export const useLogOut = ()=>{
    const {dispatch} = useAuthContext() //cnst dispatch = useContext(AuthContext) auth context eka use krnkot thama dispatch eka ganne create lrn kot newei
    const logout = ()=>{
        //remove user from local storage
        localStorage.removeItem('user')
        //dispatch logout action
        dispatch({type:'LOGOUT'})
    }
    return { logout}
}
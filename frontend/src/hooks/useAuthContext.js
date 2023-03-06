import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

/**
 * (1) useAuthContext kiyala method ekak hadanna
 *      useContext Hook eken
 */
export const useAuthContext = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw Error("useAuthContext must be used in authContext Provider")
    }return context;
}
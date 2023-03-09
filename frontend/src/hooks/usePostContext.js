import { useContext } from "react"
import { PostContext } from "../contexts/PostContext"

export const usePostContext =()=>{
    const context = useContext(PostContext)
    if(!context){
        throw Error("usePostContext must be used in authContext Provider")
    }return context
}
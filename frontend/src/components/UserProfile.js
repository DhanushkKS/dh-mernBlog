import { useLocation } from "react-router-dom";

const UserProfile = () => {
    const location   = useLocation()
    const {author_id,nickname} = location.state
    return ( 
        <>
        user profile, {author_id} &nbsp; <br/>
                nickname, {nickname}
        </>
     );
}
 
export default UserProfile;
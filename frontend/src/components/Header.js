/** useAuthcontext eken user wa ganna user kenek dantmath log welanam user variable eka null na
 * user kenek pennanawanam/innwnam logout button eka pennana
 * ehma nattam user variable eka null nam, login,regiser link deka pennanna.
 */
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogOut } from "../hooks/useLogout";
import jwt_decode from "jwt-decode"


const Header = () => {

  const { user } = useAuthContext();
  const {logout} = useLogOut()
  const navigate = useNavigate()

  // const tokenn = user.token
  // const deco = jwt_decode(tokenn)

  const handleClick = (e)=>{
    logout()
    navigate('/')
    window.location.reload(false)
  }
  return (
    <header>
      <Link to="/" className="logo">My Blog</Link>
      <nav>
        {user && (
          <div>
            <span> <Link to={'/user'} state={{author_id:'deco'._id,nickname:user.nickname}}>  welcome {user.nickname} &nbsp;</Link></span>
            <span><Link to='/create'>Create a new post</Link></span>
            <button onClick={handleClick}>Logout</button>
          </div>

        )}
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            {/* <Link to="/register" >Register</Link> */}
          </div>
        )}

      </nav>
    </header>
  );
}

export default Header;
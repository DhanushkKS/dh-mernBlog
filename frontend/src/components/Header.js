/** useAuthcontext eken user wa ganna user kenek dantmath log welanam user variable eka null na
 * user kenek pennanawanam/innwnam logout button eka pennana
 * ehma nattam user variable eka null nam, login,regiser link deka pennanna.
 */
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogOut } from "../hooks/useLogout";

const Header = () => {
  const { user } = useAuthContext();
  const {logout} = useLogOut()
  const handleClick = (e)=>{
    logout()
  }
  return (
    <header>
      <Link to="/" className="logo">My Blog</Link>
      <nav>
        {user && (
          <div>
            <span>{user.email}</span>
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
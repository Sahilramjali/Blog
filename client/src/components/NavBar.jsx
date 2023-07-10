import { Link } from "react-router-dom"

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import { UserContext } from "../hooks/userInfo";


const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isLogin,logout } = useContext(UserContext);
 
  

  const handleShow = () => {
    setShowMenu(!showMenu);
  }
  const CloseMenu = () => {
    setShowMenu(false);
  }
  const Logout = () => {
    CloseMenu();
   logout();
    
  }
  return (

    <nav className="navBar">
      <div className="logo" >
        <Link onClick={CloseMenu} className="link" to='/'>Blogger</Link>
      </div>

      <ul className={showMenu ? "nav-menu active" : "nav-menu"}>
        {
          isLogin ? <li>
            <Link onClick={Logout} className="link" to={'/login'}>Logout</Link>
            <Link onClick={CloseMenu} className="link" to={'/create'}>Create</Link>
          </li> : (<>
            <li><Link onClick={CloseMenu} className="link" to='/login'>Login</Link></li>
            <li><Link onClick={CloseMenu} className="link" to='/register'>Register</Link></li>
          </>)
        }

      </ul>
      <div className="nav-icon-mobile" onClick={handleShow}>
        {showMenu ? <CloseIcon /> : <MenuIcon />}
      </div>
    </nav>

  )
}

export default NavBar
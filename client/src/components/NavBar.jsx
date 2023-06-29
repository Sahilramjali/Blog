import { Link } from "react-router-dom"

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShow = () => {
    setShowMenu(!showMenu);
  }
  const CloseMenu=()=>{
    setShowMenu(false);
  }
  return (

    <nav className="navBar">
      <div className="logo" >
        <Link onClick={CloseMenu} className="link" to='/'>Blogger</Link>
      </div>
      <ul className={showMenu ? "nav-menu active" : "nav-menu"}>
        <li><Link onClick={CloseMenu} className="link" to='/login'>Login</Link></li>
        <li><Link onClick={CloseMenu}className="link" to='/register'>Register</Link></li>
      </ul>
      <div className="nav-icon-mobile" onClick={handleShow}>
        {showMenu ? <CloseIcon /> : <MenuIcon />}
      </div>
    </nav>

  )
}

export default NavBar
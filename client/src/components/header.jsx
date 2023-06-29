
import NavBar from "./NavBar"


// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  // const [visible, setVisible] = useState(false);
  return (
    <>
      {/* <header>
        <div className="logo">
          <Link className="link" to='/'>Blogger</Link>
        </div>
        <NavBar data={visible} className={`${visible?"active":"inactive"}`}/>
        <div onClick={() => setVisible(!visible)} className="mobile">
        {
          visible? <MenuIcon />:<CloseIcon/>
        } 

        </div>

      </header> */}
      {/* {visible && <div className="mobile-menu-link" >
        <ul>
          <li><Link onClick={() => setVisible(!visible)} className="link" to='/login'>Login</Link></li>
          <li><Link onClick={() => setVisible(!visible)} className="link" to='/register'>Register</Link></li>
        </ul>
      </div>} */}
      <header>
        <NavBar />
      </header>
    </>
  )
}

export default Header
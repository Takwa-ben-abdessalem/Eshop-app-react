import  { useEffect, useState } from 'react'
import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {FaShoppingCart, FaTimes, FaUserCircle} from "react-icons/fa"
import {HiOutlineMenuAlt3} from "react-icons/hi"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice'
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/HiddenLink'
import AdminOnlyRoute, { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../redux/slice/cartSlice'

const logo =(
  <div className={styles.logo}>
  <Link to="/">
    <h2>
      e<span>Shop</span>.
    </h2>
  </Link>
</div>
)



const Header = () => {

  const [showMenu,setShowMenu] =useState(false)
  const [displayName,setDisplayName] =useState("")
  const [scrollPage, setScrollPage] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fixNavbar = () => {
    if (window.scrollY > 50 ) {
      setScrollPage(true)
    } else {
    setScrollPage(false)
    }
  }
  window.addEventListener("scroll", fixNavbar)

  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }, [])
//Monitor currently sign in user 
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.displayName)
      if (user.displayName == null) {
        const u1 = user.email.substring(0, user.email.indexOf("@"));
        const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
        setDisplayName(uName)
      }
      else {
      setDisplayName(user.displayName)
      }
      dispatch(
        SET_ACTIVE_USER({
          email:user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid
        })
      )

    } else {
      // User is signed out
      setDisplayName("")
      dispatch(REMOVE_ACTIVE_USER())
    }
  });
}, [dispatch, displayName])

  const toggleMenu =() => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  const activeLink = ({isActive}) => 
  (isActive ? `${styles.active}` : "")

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout successfully")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
      
    });
  }

  const cart =(
    <span className={styles.cart}>
        <Link to="/cart">
            Cart 
          <FaShoppingCart size={20}></FaShoppingCart>
          <p>{cartTotalQuantity}</p>
        </Link>
  
     </span>
  )
  

  return (
    <header className={scrollPage ? `${styles.fixed}` : null }>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          
        <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`}>
  
          </div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo} 
               <FaTimes size={22} color='#ffff' onClick={hideMenu}></FaTimes>
            </li>
            <li>
            <AdminOnlyLink>
              <Link to="/admin/home">
              <button className='--btn --btn-primary'>Admin</button>
              </Link>
              </AdminOnlyLink>

            </li>
            <li> 
            <NavLink to="/" className={activeLink}>Home</NavLink>
            </li>
            <li> 
              <NavLink to="/contact" className={ activeLink}>Contact</NavLink> 
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
          <span className={styles.links}>
            <ShowOnLogout>
            <NavLink to="/login" className={ activeLink}>Login</NavLink>
            </ShowOnLogout>
            <ShowOnLogin>
            <a href='#home' style={{color : '#ff7722'}}> <FaUserCircle size={16}/>Hi, {displayName}</a>
            </ShowOnLogin>
            <ShowOnLogin>
            <NavLink to="/order-history" className={ activeLink}>My orders</NavLink>
            </ShowOnLogin>
            <ShowOnLogin>
            <NavLink to="/" onClick={logoutUser}>Log out</NavLink>
            </ShowOnLogin>

          </span>
           {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}></HiOutlineMenuAlt3>
        </div>
      </div>
    </header>
  )
}

export default Header
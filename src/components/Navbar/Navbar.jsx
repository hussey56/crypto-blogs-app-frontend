import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../api/internal";
import {resetUser} from '../../store/UserSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const handleSingout = async ()=>{
await signout();
dispatch(resetUser());

  }
  const isAuthenticated = useSelector((state) =>state.user.auth);
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to={"/"} className={`${styles.logo}`}>
          Crypto Blogs
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? styles.activeStyles : styles.inActiveStyles
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"crypto"}
          className={({ isActive }) =>
            isActive ? styles.activeStyles : styles.inActiveStyles
          }
        >
          Crypto currencies
        </NavLink>
        <NavLink
          to={"blogs"}
          className={({ isActive }) =>
            isActive ? styles.activeStyles : styles.inActiveStyles
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to={"create"}
          className={({ isActive }) =>
            isActive ? styles.activeStyles : styles.inActiveStyles
          }
        >
          Create a BLog
        </NavLink>
       {isAuthenticated ?   <NavLink>
          <button className={styles.SignoutButton} onClick={handleSingout}>
           Logout
          </button>
         
        </NavLink>:<>
       <NavLink
          to={"login"}
          className={({ isActive }) =>
            isActive ? styles.activeStyles : styles.inActiveStyles
          }
        >
          <button className={styles.LoginButton}>
            Login
          </button>
        </NavLink>
        <NavLink
          to={"signup"}
          className={({ isActive }) =>
            isActive ? styles.activeStyles : styles.inActiveStyles
          }
        >
          <button className={styles.SignupButton}>
            Sign Up
          </button>
         
        </NavLink>
       </>} 
      </nav>
      <div className={styles.seperator}></div>
    </>
  );
};

export default Navbar;

import React from 'react';
import styles from './Header.module.css';
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {authUser} from "../../fbase";
import {signOut } from "firebase/auth";
const Header = ({isLoggin}) => {

    const logOut = async()=>await signOut(authUser);

    return(
        <header className={styles.header}>
        <FontAwesomeIcon  icon={faIdCard} size='3x'/>
        <p className={styles.description}>Business Card Maker</p>
        {isLoggin && <button onClick={logOut} className={styles.logoutBtn}>log out</button>}
        </header>
    )
};

export default Header;
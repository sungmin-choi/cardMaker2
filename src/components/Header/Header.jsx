import React from 'react';
import styles from './Header.module.css';
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({isLoggin,firebase}) => {

    const logOut =()=>firebase.logOut();

    return(
        <header className={styles.header}>
        <FontAwesomeIcon  icon={faIdCard} size='3x'/>
        <p className={styles.description}>Business Card Maker</p>
        {isLoggin && <button onClick={logOut} className={styles.logoutBtn}>log out</button>}
        </header>
    )
};

export default Header;
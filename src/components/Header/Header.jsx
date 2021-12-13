import React from 'react';
import styles from './Header.module.css';
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = ({isLoggin}) => {
    return(
        <header className={styles.header}>
        <FontAwesomeIcon  icon={faIdCard} size='3x'/>
        <p className={styles.description}>Business Card Maker</p>
        {isLoggin && <button>log out</button>}
        </header>
    )
};

export default Header;
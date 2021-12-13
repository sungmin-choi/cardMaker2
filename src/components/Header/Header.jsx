import React from 'react';
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = (props) => {
    return(
        <header>
        <FontAwesomeIcon icon={faIdCard}/>
        <p>Business Card Maker</p>
        </header>
    )
};

export default Header;
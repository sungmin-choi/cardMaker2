import React from 'react';
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = ({isLoggin}) => {
    return(
        <header>
        <FontAwesomeIcon icon={faIdCard}/>
        <p>Business Card Maker</p>
        {isLoggin && <button>log out</button>}
        </header>
    )
};

export default Header;
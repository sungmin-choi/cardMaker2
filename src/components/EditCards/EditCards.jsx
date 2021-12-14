import React from 'react';
import styles from './EditCards.module.css';
import EditCard from '../EditCard/EditCard';
const EditCards = ({userObj}) => {
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Card Maker</h1>
            <EditCard userObj={userObj}/>
        </div>
    )
};

export default EditCards;
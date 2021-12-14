import React from 'react';
import styles from './EditCards.module.css';
import EditCard from '../EditCard/EditCard';
const EditCards = (props) => {
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Card Maker</h1>
            <EditCard/>
        </div>
    )
};

export default EditCards;
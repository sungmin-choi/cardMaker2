import React from 'react';
import styles from './EditCards.module.css';
import EditCard from '../EditCard/EditCard';
const EditCards = ({userObj,cardsObj,refresh}) => {

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Card Maker</h1>
            {cardsObj&& cardsObj.map((cardObj)=><EditCard key={cardObj[0]} userObj={userObj}  refresh={refresh} cardObj={cardObj[1]}/>)}
            <EditCard key={null} cardObj={null} refresh={refresh} userObj={userObj}/>
        </div>
    )
};

export default EditCards;
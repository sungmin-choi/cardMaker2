import React from 'react';
import styles from './EditCards.module.css';
import EditCard from '../EditCard/EditCard';
const EditCards = ({userObj,cardsObj,refresh,firebase}) => {

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Card Maker</h1>
            {cardsObj&& cardsObj.map((cardObj)=><EditCard key={cardObj[0]} cardId={cardObj[0]} firebase={firebase} userObj={userObj}  refresh={refresh} cardObj={cardObj[1]}/>)}
            <EditCard key={null} cardObj={null} refresh={refresh} cardId={null} userObj={userObj} firebase={firebase}/>
        </div>
    )
};

export default EditCards;
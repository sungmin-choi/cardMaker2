import React from 'react';
import styles from './CardsPreview.module.css';
import CardPreview from '../CardPreview/CardPreview';
const CardsPreview = ({userObj,cardsObj}) => {
    return(
        <div className={styles.container}> 
        <h1 className={styles.title}>Card Preview</h1>
        {cardsObj && cardsObj.map((cardObj)=><CardPreview key={cardObj[0]} userObj={userObj} cardObj={cardObj[1]} cardId={cardObj[0]}/>)}

        
        </div>
    )
};

export default CardsPreview;
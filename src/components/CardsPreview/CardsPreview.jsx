import React from 'react';
import styles from './CardsPreview.module.css';
import CardPreview from '../CardPreview/CardPreview';
const CardsPreview = ({userObj,cardsObj}) => {
    return(
        <div className={styles.container}> 
        <h1 className={styles.title}>Card Preview</h1>
        {cardsObj && cardsObj.map((cardObj)=><CardPreview userObj={userObj} cardObj={cardObj}/>)}

        
        </div>
    )
};

export default CardsPreview;
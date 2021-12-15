import React from 'react';
import styles from './CardPreview.module.css';
import {ref, onValue} from "firebase/database";
import { cardDb } from '../../fbase';

const CardPreview = ({userObj,cardObj}) => {
    const starCountRef = ref(cardDb, `cards/${userObj.userId}/${cardObj[0]}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });

    return(
        <div className={styles.container}>
            <img className={styles.profile} src="./logo512.png" alt="profile" />
            <div className={styles.card}>
                <header className={styles.name}>Ellie</header>
                <span className={styles.company}>Samsung</span>
                <div className={styles.divider}></div>
                <span className={styles.title}>Soft Engineer</span>
                <span className={styles.email}>ellie@gmail.com</span>
                <span className={styles.message}>go for it</span>
            </div>

        </div>
    )
};

export default CardPreview;
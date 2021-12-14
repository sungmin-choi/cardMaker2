import React from 'react';
import styles from './EditPage.module.css';
import EditCards from '../../components/EditCards/EditCards';
import CardsPreview from '../../components/CardsPreview/CardsPreview';
const EditPage = ({userObj}) => {
    return(
        <div className={styles.container}>
            <EditCards userObj={userObj}/>
            <div className={styles.liner}></div>
            <CardsPreview userObj={userObj}/>
        </div>
    )
};

export default EditPage;
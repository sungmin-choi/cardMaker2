import React from 'react';
import styles from './EditPage.module.css';
import EditCards from '../../components/EditCards/EditCards';
import CardsPreview from '../../components/CardsPreview/CardsPreview';
const EditPage = (props) => {
    return(
        <div className={styles.container}>
            <EditCards/>
            <div className={styles.liner}></div>
            <CardsPreview/>
        </div>
    )
};

export default EditPage;
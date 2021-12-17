import React,{useState,useEffect} from 'react';
import styles from './EditPage.module.css';
import EditCards from '../../components/EditCards/EditCards';
import CardsPreview from '../../components/CardsPreview/CardsPreview';

const EditPage = ({userObj,firebase}) => {
    const [cardsObj,setCardsObj]=useState(null);

    //{cardsObj.map((cardObj)=><EditCard userObj={userObj} cardObj={cardObj} isValidCard={true}/> )}
    useEffect(()=>{
        firebase.getCardsInfo(userObj,setCardsObj);
    },[]);

    const refresh=()=>firebase.getCardsInfo(userObj,setCardsObj);

    return(
        <div className={styles.container}>
            <EditCards userObj={userObj} refresh={refresh} cardsObj={cardsObj}/>
            <div className={styles.liner}></div>
            <CardsPreview userObj={userObj} refresh={refresh} cardsObj={cardsObj} firebase={firebase}/>
        </div>
    )
};

export default EditPage;
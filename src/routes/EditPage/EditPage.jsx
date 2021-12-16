import React,{useState,useEffect} from 'react';
import { cardDb } from '../../fbase';
import styles from './EditPage.module.css';
import EditCards from '../../components/EditCards/EditCards';
import CardsPreview from '../../components/CardsPreview/CardsPreview';
import {ref, child, get } from "firebase/database";
const EditPage = ({userObj}) => {
    const [cardsObj,setCardsObj]=useState(null);

    const getCards = async()=>{
        const dbRef = ref(cardDb);
        await get(child(dbRef, `cards/${userObj.userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
              setCardsObj(Object.entries(snapshot.val()));
            } else {
                setCardsObj(null);
            }
        });
    }
    //{cardsObj.map((cardObj)=><EditCard userObj={userObj} cardObj={cardObj} isValidCard={true}/> )}
    useEffect(()=>{
        getCards();
    },[]);

    const refresh=()=>{
        getCards();
    }

    return(
        <div className={styles.container}>
            <EditCards userObj={userObj} refresh={refresh} cardsObj={cardsObj}/>
            <div className={styles.liner}></div>
            <CardsPreview userObj={userObj} refresh={refresh} cardsObj={cardsObj}/>
        </div>
    )
};

export default EditPage;
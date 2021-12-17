import React ,{useEffect, useState}from 'react';
import styles from './CardPreview.module.css';
import {ref, onValue} from "firebase/database";
import { cardDb } from '../../fbase';

const defaultImg='./logo512.png';

const CardPreview = ({userObj,cardObj,cardId,firebase}) => {
    const [name,setName] = useState(cardObj?cardObj.name:"");
    const [company,setCompany] = useState(cardObj?cardObj.company:"");
    const [color,setColor] = useState(cardObj?cardObj.color:"Dark");
    const [title,setTitle] = useState(cardObj?cardObj.title:"");
    const [email,setEmail] = useState(cardObj?cardObj.email:"");
    const [message,setMessage] = useState(cardObj?cardObj.message:"");
    const [imgUrl,setImgUrl] = useState(defaultImg);
    const [colorObj,setColorObj] = useState({});

    const cardStateObj={
        name,company,color,title,email,message,imgUrl,colorObj,
        setName,setTitle,setCompany,setColor,setColorObj,setMessage,
        setImgUrl,setEmail
    }
    const changeCardColor=(color)=>{
        if(color === 'Dark'){
            setColorObj({
                'backgroundColor':"#2d3436",
                'color':"#f5f6fa"
            })
        }else if(color==='Light'){
            setColorObj({
                'backgroundColor':"#f5f6fa",
                'color':"#2d3436"
            })
        }else if(color==="Colorful"){
            setColorObj({
                'background': 'rgb(2,0,36)',
                'background': 'linear-gradient(342deg, rgba(2,0,36,1) 0%, rgba(85,9,121,1) 35%, rgba(0,212,255,1) 100%)',
                'color':"#f5f6fa"
            })
        }
    }
    useEffect(()=>{
        changeCardColor(color);
    },[]);

    const cardRef = firebase.getCardRef(userObj,cardId);
    firebase.cardOnvalue(cardRef,cardStateObj);

    return(
        <div style={colorObj} className={styles.container}>
            <img className={styles.profile} src={imgUrl} alt="profile" />
            <div className={styles.card}>
                <header  className={styles.name}>{`${name}`}</header>
                <span  className={styles.company}>{`${company}`}</span>
                <div className={styles.divider}></div>
                <span  className={styles.title}>{`${title}`}</span>
                <span  className={styles.email}>{`${email}`}</span>
                <span  className={styles.message}>{`${message}`}</span>
            </div>
        </div>
    )
};

export default CardPreview;
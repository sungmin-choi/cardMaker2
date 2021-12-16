import React ,{useEffect, useState}from 'react';
import styles from './CardPreview.module.css';
import {ref, onValue} from "firebase/database";
import { cardDb } from '../../fbase';

const CardPreview = ({userObj,cardObj,cardId}) => {
    const [name,setName] = useState(cardObj?cardObj.name:"");
    const [company,setCompany] = useState(cardObj?cardObj.company:"");
    const [color,setColor] = useState(cardObj?cardObj.color:"Dark");
    const [title,setTitle] = useState(cardObj?cardObj.title:"");
    const [email,setEmail] = useState(cardObj?cardObj.email:"");
    const [message,setMessage] = useState(cardObj?cardObj.message:"");
    const [colorObj,setColorObj] = useState({});

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
    const starCountRef = ref(cardDb, `cards/${userObj.userId}/${cardId}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if(data){
      if(data.title!==title) setTitle(data.title);
      if(data.name!==name)setName(data.name); 
      if(data.color!==color){
          setColor(data.color);
          changeCardColor(data.color);
      }
      if(data.company!==company)setCompany(data.company);
      if(data.email!==email)setEmail(data.email);
      if(data.message!==message)setMessage(data.message);
    }
    })

    return(
        <div style={colorObj} className={styles.container}>
            <img className={styles.profile} src="./logo512.png" alt="profile" />
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
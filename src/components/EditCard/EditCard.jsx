import React, { useState } from 'react';
import { cardDb } from '../../fbase';
import { ref, set ,push,remove} from "firebase/database";
import styles from './EditCard.module.css';
const EditCard = ({userObj,cardObj,refresh,cardId}) => {
    const [name,setName] = useState(cardObj?cardObj.name:"");
    const [company,setCompany] = useState(cardObj?cardObj.company:"");
    const [color,setColor] = useState(cardObj?cardObj.color:"Dark");
    const [title,setTitle] = useState(cardObj?cardObj.title:"");
    const [email,setEmail] = useState(cardObj?cardObj.email:"");
    const [message,setMessage] = useState(cardObj?cardObj.message:"");
      
      const writeUserData =()=> {
        const cardObj = {
            key:cardId,
            name,
            company,
            color,
            title,
            email,
            message,
        }
        set(ref(cardDb, `cards/${userObj.userId}/${cardId}`), cardObj);
      }
    const onChange = (event) =>{
        const {target:{name,value}}=event;
        switch(name){
            case "Name":
                setName(value);
                break;
            case "Company":
                setCompany(value);
                break;
            case "Color":
                setColor(value);
                break;
            case "Title":
                setTitle(value);
                break;
            case "Email":
                setEmail(value);
                break;
            case "Message":
                setMessage(value);
                break;
            default:
                break;
        }
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        const cardListRef = ref(cardDb,`cards/${userObj.userId}`);
        const newCardRef = push(cardListRef);
        const cardObj = {
            key:newCardRef.key,
            name,
            company,
            color,
            title,
            email,
            message,
        }
        set(newCardRef,cardObj);
        setName("");
        setCompany("");
        setEmail("");
        setColor('Dark');
        setTitle("");
        setMessage("");
        refresh();
    }

    const deletCard=()=>{
        remove(ref(cardDb, `cards/${userObj.userId}/${cardId}`));
        refresh();
    }
    
    if(cardId) writeUserData();

    return (
        <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.div1}>
            <input onChange={onChange} className={styles.input} type="text" value={name} name="Name" placeholder="Name"/>
            <input onChange={onChange} className={styles.input} type="text" value={company} name="Company" placeholder="Company"/>
            <select onChange={onChange} className={styles.input} value={color} name="Color" id="">
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="Colorful">Colorful</option>
            </select>
            </div>
            <div className={styles.div2}>
            <input onChange={onChange} className={styles.input} type="text" value={title} name="Title" placeholder="Title"/>
            <input onChange={onChange} className={styles.input} type="email" value={email} name="Email" placeholder="Email"/>
            </div>
            <textarea  onChange={onChange} className={styles.textarea}value={message} name="Message" id="" cols="30" rows="10" placeholder="Message"></textarea>
            <div className={styles.div3}>
            <label className={styles.imageBtn}  htmlFor="input-image">No file</label>
            <input className={styles.inputImg} id="input-image"type="file" accept="image/*"/>
            {cardObj ?<input className={styles.submitBtn} onClick={deletCard} type="button" value="Delete"/>:
             <input className={styles.submitBtn}  type="submit" value="Add"/> }
            </div>
        </form>
        </div>
    )
};

export default EditCard;
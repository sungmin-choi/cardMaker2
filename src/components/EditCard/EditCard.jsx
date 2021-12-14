import React, { useState } from 'react';
import { cardDb } from '../../fbase';
import { getDatabase,ref, set ,push} from "firebase/database";
import styles from './EditCard.module.css';
const EditCard = ({userObj}) => {
    const [name,setName] = useState("");
    const [company,setCompany] = useState("");
    const [color,setColor] = useState("Light");
    const [title,setTitle] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

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
        const cardListRef = ref(cardDb);
        const newCardRef = push(cardListRef);
        const cardObj = {
            uid:userObj.uid,
            name,
            company,
            color,
            title,
            email,
            message,
            createAt : Date.now()
        }
        set(newCardRef,cardObj);
    }

    return (
        <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.div1}>
            <input onChange={onChange} className={styles.input} type="text" name="Name" placeholder="Name"/>
            <input onChange={onChange} className={styles.input} type="text" name="Company" placeholder="Company"/>
            <select onChange={onChange} className={styles.input} name="Color" id="">
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="Colorful">Colorful</option>
            </select>
            </div>
            <div className={styles.div2}>
            <input onChange={onChange} className={styles.input} type="text" name="Title" placeholder="Title"/>
            <input onChange={onChange} className={styles.input} type="email" name="Email" placeholder="Email"/>
            </div>
            <textarea  onChange={onChange} className={styles.textarea}name="Message" id="" cols="30" rows="10" placeholder="Message"></textarea>
            <div className={styles.div3}>
            <label className={styles.imageBtn}  htmlFor="input-image">No file</label>
            <input className={styles.inputImg} id="input-image"type="file" accept="image/*"/>
            <input className={styles.input,styles.submitBtn} type="submit" value="Add"/>
            </div>
        </form>
        </div>
    )
};

export default EditCard;
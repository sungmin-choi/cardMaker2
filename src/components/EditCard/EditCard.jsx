import React, { useRef, useState } from 'react';
import { cardDb } from '../../fbase';
import { ref, set ,push,remove} from "firebase/database";
import styles from './EditCard.module.css';

const defaultImg='./logo512.png';
const cloud_url = "https://api.cloudinary.com/v1_1/dzziboalh/image/upload";

const EditCard = ({userObj,cardObj,refresh,cardId}) => {
    const [name,setName] = useState(cardObj?cardObj.name:"");
    const [company,setCompany] = useState(cardObj?cardObj.company:"");
    const [color,setColor] = useState(cardObj?cardObj.color:"Dark");
    const [title,setTitle] = useState(cardObj?cardObj.title:"");
    const [email,setEmail] = useState(cardObj?cardObj.email:"");
    const [message,setMessage] = useState(cardObj?cardObj.message:"");
    const [imgUrl,setImgUrl] = useState(cardObj?cardObj.imgUrl:defaultImg);
    const [imgName,setImgName]=useState( cardObj?(cardObj.imgUrl!==defaultImg? cardObj.imgName:"No File"):"No File");


    const onChangeFile = async (event)=>{
        const {target:{files}}=event;

        const formData = new FormData();
        let theFile = files[0];
        formData.append("file", theFile);
        formData.append("upload_preset","aaek2djt");
        await fetch(cloud_url, {
        method: "POST",
        body: formData
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setImgUrl(data.url);
            setImgName(data.original_filename);
        });
        refresh();

    }

    const writeUserData =()=> {
        const cardObj = {
            key:cardId,
            name,
            company,
            color,
            title,
            email,
            message,
            imgUrl,
            imgName
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
            imgUrl,
            imgName
        }
        set(newCardRef,cardObj);
        setName("");
        setCompany("");
        setEmail("");
        setColor('Dark');
        setTitle("");
        setMessage("");
        setImgName("No File");
        setImgUrl(defaultImg);
        refresh();
    }

    const deletCard=()=>{
        remove(ref(cardDb, `cards/${userObj.userId}/${cardId}`));
        refresh();
    }
    
    if(cardId) {
        console.log(cardId);
        writeUserData();
    }
    //style={cardObj.imgUrl!==defaultImg? {"background-color":"#f78fb3"}:{"background-color": "gray"}} 
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
            <label className={styles.imageBtn} style={cardObj&& cardObj.imgUrl!==defaultImg? {"backgroundColor":"#f78fb3"}:{"backgroundColor": "gray"}} >{imgName}</label>
            <input onChange={onChangeFile} className={styles.inputImg} type="file" accept="image/*"/>
            {cardObj ?<input className={styles.submitBtn} onClick={deletCard} type="button" value="Delete"/>:
             <input className={styles.submitBtn}  type="submit" value="Add"/> }
            </div>
        </form>
        </div>
    )
};

export default EditCard;
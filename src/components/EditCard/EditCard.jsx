import React, {useState } from 'react';
import styles from './EditCard.module.css';
import Cloudinary from '../../cloudinary';

const defaultImg=process.env.REACT_APP_DEFAULT_IMG;
const cloudinary = new Cloudinary();

const EditCard = ({userObj,cardObj,refresh,cardId,firebase}) => {
    const [name,setName] = useState(cardObj?cardObj.name:"");
    const [company,setCompany] = useState(cardObj?cardObj.company:"");
    const [color,setColor] = useState(cardObj?cardObj.color:"Dark");
    const [title,setTitle] = useState(cardObj?cardObj.title:"");
    const [email,setEmail] = useState(cardObj?cardObj.email:"");
    const [message,setMessage] = useState(cardObj?cardObj.message:"");
    const [imgUrl,setImgUrl] = useState(cardObj?cardObj.imgUrl:defaultImg);
    const [imgName,setImgName]=useState( cardObj?(cardObj.imgUrl!==defaultImg? cardObj.imgName:"No File"):"No File");
    
    const cardStateObj={
        name,company,color,title,email,message,imgUrl,imgName,
        setName,setTitle,setCompany,setColor,setMessage,
        setImgUrl,setEmail
    }

    const onChangeFile = (event)=>{
        const {target:{files}}=event;
        cloudinary.uploadImage(files,setImgUrl,setImgName);
        refresh();

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
        firebase.setNewCard(userObj,cardStateObj);
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
        firebase.deleteCard(userObj,cardId);
        refresh();
    }
    
    if(cardId) {
        firebase.wirteCardData(cardId,userObj,cardStateObj);
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
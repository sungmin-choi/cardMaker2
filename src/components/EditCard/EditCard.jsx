import React from 'react';
import styles from './EditCard.module.css';
const EditCard = (props) => {
    return (
        <div className={styles.container}>
        <form className={styles.form} action="">
            <div className={styles.div1}>
            <input className={styles.input} type="text" name="Name" placeholder="Name"/>
            <input className={styles.input} type="text" name="Company" placeholder="Company"/>
            <select className={styles.input}name="Color" id="">
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="Colorful">Colorful</option>
            </select>
            </div>
            <div className={styles.div2}>
            <input className={styles.input} type="text" name="Title" placeholder="Title"/>
            <input className={styles.input} type="email" name="Email" placeholder="Email"/>
            </div>
            <textarea  className={styles.textarea}name="Message" id="" cols="30" rows="10" placeholder="Message"></textarea>
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
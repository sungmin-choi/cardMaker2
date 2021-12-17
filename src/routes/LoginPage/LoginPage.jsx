import React from 'react';
import styles from './LoginPage.module.css';

const LoginPage = ({firebase}) => {

    const socialLogin=(event)=>{
        firebase.socialLogin(event);
    }
    
    return(<section className={styles.container}>
            <h1 className={styles.title} >Login</h1>
            <button className={styles.socialButton} onClick={socialLogin} name="Google">Google</button>
            <button className={styles.socialButton} onClick={socialLogin} name="Github">Github</button>
    </section>);
};

export default LoginPage;
import React from 'react';
import { authUser } from '../../fbase';
import { GoogleAuthProvider ,signInWithPopup,GithubAuthProvider} from "firebase/auth";
import styles from './LoginPage.module.css';
const LoginPage = (props) => {
    const socialLogin= async(event)=>{
        const {target:{name}}=event;
        let provider;
        if(name==="Google") provider=new GoogleAuthProvider();
        else if(name==="Github") provider =new GithubAuthProvider();
        await signInWithPopup(authUser, provider);
    }
    return(<section className={styles.container}>
            <h1 className={styles.title} >Login</h1>
            <button className={styles.socialButton} onClick={socialLogin} name="Google">Google</button>
            <button className={styles.socialButton} onClick={socialLogin} name="Github">Github</button>
    </section>);
};

export default LoginPage;
import React from 'react';
import { authUser } from '../../fbase';
import { GoogleAuthProvider ,signInWithPopup,GithubAuthProvider} from "firebase/auth";
const LoginPage = (props) => {

    const socialLogin= async(event)=>{
        const {target:{name}}=event;
        let provider;
        if(name==="Google") provider=new GoogleAuthProvider();
        else if(name==="Github") provider =new GithubAuthProvider();
        await signInWithPopup(authUser, provider);
    }
    return(<section>
            <p>Login</p>
            <button onClick={socialLogin} name="Google">Google</button>
            <button onClick={socialLogin} name="Github">Github</button>
    </section>);
};

export default LoginPage;
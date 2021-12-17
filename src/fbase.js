
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import {onAuthStateChanged,signOut } from "firebase/auth";
import {ref, child, get,onValue,push,remove,set } from "firebase/database";
import { GoogleAuthProvider ,signInWithPopup,GithubAuthProvider} from "firebase/auth";

export default class FirebaseService{
  constructor(){
    this.firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId:process.env.REACT_APP_APP_ID
    };
    this.app=initializeApp(this.firebaseConfig);
    this.authUser = getAuth();
    this.cardDb = getDatabase(this.app); 
  }

  stateChanged(setUserObj,setIsLoggin){
    onAuthStateChanged(this.authUser, (user) => {
      if (user) {
        const userObj={
          userId:user.uid,
          createAt:user.metadata.createdAt,
        }
        setUserObj(userObj);
        setIsLoggin(true);
      } else {
        setIsLoggin(false);
      }
    });
  }

  getCardsInfo=async(userObj,setCardsObj)=>{
    const dbRef = ref(this.cardDb);
    await get(child(dbRef, `cards/${userObj.userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setCardsObj(Object.entries(snapshot.val()));
      } else {
          setCardsObj(null);
      }
  })
  }

  socialLogin =async(event)=>{
      const {target:{name}}=event;
      let provider;
      if(name==="Google") provider=new GoogleAuthProvider();
      else if(name==="Github") provider =new GithubAuthProvider();
      await signInWithPopup(this.authUser, provider);
  }

  getCardRef(userObj,cardId){
    return ref(this.cardDb, `cards/${userObj.userId}/${cardId}`);
  }

  cardOnvalue(cardRef,card){
    onValue(cardRef, (snapshot) => {
      const data = snapshot.val();
      if(data){
      if(data.title!==card.title) card.setTitle(data.title);
      if(data.name!==card.name)card.setName(data.name); 
      if(data.color!==card.color){
          card.setColor(data.color);
          card.changeCardColor(data.color);
      }
      if(data.company!==card.company)card.setCompany(data.company);
      if(data.email!==card.email)card.setEmail(data.email);
      if(data.message!==card.message)card.setMessage(data.message);
      if(data.imgUrl!==card.imgUrl) card.setImgUrl(data.imgUrl);
      }
    })
  }

  wirteCardData(cardId,userObj,card){
    const cardObj = {
      key:cardId,
      name:card.name,
      company:card.company,
      color:card.color,
      title:card.title,
      email:card.email,
      message:card.message,
      imgUrl:card.imgUrl,
      imgName:card.imgName
  }
  set(ref(this.cardDb, `cards/${userObj.userId}/${cardId}`), cardObj);
  }

  setNewCard(userObj,card){
    const cardListRef = ref(this.cardDb,`cards/${userObj.userId}`);
    const newCardRef = push(cardListRef);
    const cardObj = {
        key:newCardRef.key,
        name:card.name,
        company:card.company,
        color:card.color,
        title:card.title,
        email:card.email,
        message:card.message,
        imgUrl:card.imgUrl,
        imgName:card.imgName
    }
    set(newCardRef,cardObj);
  }

  deleteCard(userObj,cardId){
    remove(ref(this.cardDb, `cards/${userObj.userId}/${cardId}`));
  }

  logOut=async()=>await signOut(this.authUser);

}


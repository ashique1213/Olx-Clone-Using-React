import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

//sign-up function
const signup = async(name, email, password, phoneNumber)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            phoneNumber
        });
        console.log("New User Signed in");
        toast.success("SignUp Successfull");
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

//login function
const login = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login Successfull");
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}


//addProduct function
const addProduct = async(product) => {
    try {
        const res = await addDoc(collection(db, "products"), product);
        console.log(product)
        console.log("Product added with ID:", res.id);
        toast.success("Product added");
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' ')); 
    }
}

//logout function
const logout = () => {
    signOut(auth);
    toast.success("Logout Successfull");
}

export {
    signup,
    login,
    logout,
    auth,
    addProduct,
    storage,
    db
}
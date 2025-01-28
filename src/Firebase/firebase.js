import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwXk25K1Ez-vehpp6PKs1Tz8owCXG6lGI",
    authDomain: "olx-clone-6e99a.firebaseapp.com",
    projectId: "olx-clone-6e99a",
    storageBucket: "olx-clone-6e99a.firebasestorage.app",
    messagingSenderId: "295281271091",
    appId: "1:295281271091:web:da0b4133e8cb29b8c69e46"
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
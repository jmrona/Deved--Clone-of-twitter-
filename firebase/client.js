import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_CONFIG_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FB_CONFIG_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_CONFIG_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FB_CONFIG_STORAGE,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_CONFIG_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FB_CONFIG_APPID,
    measurementId: process.env.NEXT_PUBLIC_FB_CONFIG_MEASUREMENTID,
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
    const { email, photoURL, displayName, uid } = user;
    return {
        avatar: photoURL,
        username: displayName,
        email,
        uid,
    };
};

export const onAuthStateChanged = (onChange) => {
    return firebase.auth().onAuthStateChanged((user) => {
        const normalizedUser = user
            ? mapUserFromFirebaseAuthToUser(user)
            : null;

        onChange(normalizedUser);
    });
};

export const loginWithGitHub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(githubProvider);
};

export const loginWithFacebook = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(facebookProvider);
};

export const loginWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider);
};

export const loginWithMicrosoft = () => {
    const microsoftProvider = new firebase.auth.OAuthProvider("microsoft.com");
    return firebase.auth().signInWithRedirect(microsoftProvider);
};

export const addDevit = ({ avatar, content, userId, userName, img }) => {
    return db.collection("devits").add({
        avatar,
        content,
        img,
        userId,
        userName,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        likesCount: 0,
        sharedCount: 0,
    });
};
const mapDevitFromFirebaseToDevitObj = (doc) => {
    const data = doc.data();
    const id = doc.id;
    const { createdAt } = data;

    return {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
    };
};

export const listenLatestDevits = (handleNewDevits) => {
    return db
        .collection("devits")
        .orderBy("createdAt", "desc")
        .limit(20)
        .onSnapshot(({ docs }) => {
            const newDevits = docs.map((doc) =>
                mapDevitFromFirebaseToDevitObj(doc)
            );
            handleNewDevits(newDevits);
        });
};

export const uploadImage = (file) => {
    const ref = firebase.storage().ref(`/images/${file.name}`);
    const task = ref.put(file);

    return task;
};

import { Button } from "components/Button";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/components/Compose/Devit.module.css";

import { addDevit, uploadImage } from "firebase/client";
import Head from "next/head";
import { Avatar } from "components/Avatar";
import Link from "next/link";
import { Home } from "components/Icons/Home";
import { Search } from "components/Icons/Search";
import { Create } from "components/Icons/Create";

const COMPOSE_STATES = {
    USER_NOT_KNOWN: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1,
};

const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3,
};

export default function ComposeDevit() {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);

    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
    const [task, setTask] = useState(null);
    const [imgURL, setImgURL] = useState(null);

    const user = useUser();
    const router = useRouter();

    useEffect(() => {
        if (task) {
            let onProgress = () => {};
            let onError = () => {};
            let onComplete = () => {
                console.log("onComplete");
                task.snapshot.ref.getDownloadURL().then(setImgURL);
            };
            task.on("state_changed", onProgress, onError, onComplete);
        }
    }, [task]);

    const handleChange = (e) => {
        const { value } = e.target;
        setMessage(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(COMPOSE_STATES.LOADING);

        addDevit({
            avatar: user.avatar,
            content: message,
            userId: user.uid,
            userName: user.username,
            img: imgURL,
        })
            .then(() => {
                router.push("/home");
            })
            .catch((err) => {
                console.error(err);
                setStatus(COMPOSE_STATES.ERROR);
            });
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
    };

    const handleDragLeace = (e) => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.NONE);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.NONE);
        const file = e.dataTransfer.files[0];

        const task = uploadImage(file);
        setTask(task);
    };

    const isButtonDisabled =
        !message.length || status === COMPOSE_STATES.LOADING;

    return (
        <>
            <Head>
                <title>Deved / Creating devit</title>
            </Head>

            <header className="header">
                <h2 className={styles.h2}>Devit</h2>
            </header>
            <main className={styles.main}>
                <section className={styles.form__container}>
                    {user && (
                        <section className={styles.avatar__container}>
                            <Avatar src={user.avatar} />
                        </section>
                    )}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <textarea
                            className={`${styles.textarea} ${
                                drag === DRAG_IMAGE_STATES.DRAG_OVER
                                    ? styles.dashed
                                    : ""
                            }`}
                            placeholder="What is happening?"
                            onChange={handleChange}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeace}
                            onDrop={handleDrop}
                            value={message}
                        ></textarea>
                        {imgURL && (
                            <section className={styles.section}>
                                <button
                                    className={styles.btn__img}
                                    onClick={() => setImgURL(null)}
                                >
                                    x
                                </button>
                                <img src={imgURL} className={styles.img} />
                            </section>
                        )}
                        <Button disabled={isButtonDisabled}>Devitear</Button>
                    </form>
                </section>
            </main>
            <nav className="nav">
                <Link href="/home">
                    <a>
                        <Home width="35px" height="35px" />
                    </a>
                </Link>
                <Link href="#">
                    <a>
                        <Search width="35px" height="35px" />
                    </a>
                </Link>
                <Link href="/compose/devit">
                    <a>
                        <Create width="35px" height="35px" />
                    </a>
                </Link>
            </nav>
        </>
    );
}
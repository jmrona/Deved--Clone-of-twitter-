import { Devit } from "components/Devit";
import { listenLatestDevits } from "firebase/client";
import useUser from "hooks/useUser";
import { useEffect, useState } from "react";
import styles from "styles/pages/HomePage.module.css";
import Head from "next/head";
import Link from "next/link";
import { Home } from "components/Icons/Home";
import { Search } from "components/Icons/Search";
import { Create } from "components/Icons/Create";

export default function HomePage() {
    const [timeline, setTimeline] = useState([]);
    const user = useUser();

    useEffect(() => {
        let unsubscribe;

        if (user) {
            unsubscribe = listenLatestDevits(setTimeline);
        }
        return () => unsubscribe && unsubscribe();
        // user && fetchLatestDevits().then(setTimeline);
    }, [user]);

    return (
        <>
            <Head>
                <title>Deved / Home</title>
            </Head>
            <header className="header">
                <h2>Home</h2>
            </header>
            <main>
                <section className={styles.section}>
                    {timeline.map(
                        ({
                            avatar,
                            id,
                            content,
                            img,
                            userName,
                            userId,
                            createdAt,
                        }) => {
                            return (
                                <Devit
                                    avatar={avatar}
                                    createdAt={createdAt}
                                    id={id}
                                    img={img}
                                    key={id}
                                    content={content}
                                    userName={userName}
                                    userId={userId}
                                />
                            );
                        }
                    )}
                </section>
            </main>
            <nav className="nav">
                <Link href="/home">
                    <a>
                        <Home width="25px" height="25px" />
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

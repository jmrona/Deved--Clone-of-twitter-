import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Button } from "components/Button";
import { GitHub } from "components/Icons/Github";
import { Facebook } from "components/Icons/Facebook";
import { Google } from "components/Icons/Google";
import { Jmrona } from "components/Icons/Jmrona";

import styles from "styles/Home.module.css";

import {
    loginWithFacebook,
    loginWithGitHub,
    loginWithGoogle,
    loginWithMicrosoft,
} from "firebase/client";
import useUser, { USER_STATES } from "hooks/useUser";
import { Microsoft } from "components/Icons/Microsoft";

export default function Home() {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
        user && router.replace("/home");
    }, [user]);

    const handleLoginGithub = () => {
        loginWithGitHub().catch((err) => {
            console.log(err);
        });
    };

    const handleLoginFacebook = () => {
        loginWithFacebook().catch((err) => {
            console.log(err);
        });
    };

    const handleLoginGoogle = () => {
        loginWithGoogle().catch((err) => {
            console.log(err);
        });
    };

    const handleLoginMicrosoft = () => {
        loginWithMicrosoft().catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <Head>
                <title>Deved</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <main className={styles.main}>
                    <Jmrona />
                    <h2 className={styles.subtitle}>
                        Talk about development
                        <br />
                        with developers
                    </h2>
                    <div>
                        {user === USER_STATES.NOT_LOGGED && (
                            <div className={styles.btn__group}>
                                <Button onClick={handleLoginGithub}>
                                    <GitHub width={24} height={24} />
                                    Log with GitHub
                                </Button>
                                <Button onClick={handleLoginFacebook}>
                                    <Facebook width={24} height={24} />
                                    Log with Facebook
                                </Button>
                                <Button onClick={handleLoginGoogle}>
                                    <Google width={24} height={24} />
                                    Log with Google
                                </Button>
                                <Button onClick={handleLoginMicrosoft}>
                                    <Microsoft width={24} height={24} />
                                    Log with Microsoft
                                </Button>
                            </div>
                        )}

                        {user === USER_STATES.NOT_KNOWN && (
                            <img src="/spinner.gif" />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

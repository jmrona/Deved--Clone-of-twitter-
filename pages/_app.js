import { useState } from "react";
import styles from "styles/pages/HomePage.module.css";
import Modal from "components/Modal";

import "../styles/globals.css";
import { ModalProvider } from "contexts/ModalContext";

export default function MyApp({ Component, pageProps }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="container">
            <main className="main">
                <ModalProvider>
                    <section className={styles.section}>
                        <Component {...pageProps} />
                    </section>
                </ModalProvider>
            </main>
        </div>
    );
}

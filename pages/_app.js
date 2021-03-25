import styles from "styles/pages/HomePage.module.css";

import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
    return (
        <div className="container">
            <main className="main">
                <section className={styles.section}>
                    <Component {...pageProps} />
                </section>
            </main>
        </div>
    );
}

import styles from "styles/components/Avatar/Avatar.module.css";

export const Avatar = ({ alt, src, text }) => {
    return (
        <div className={styles.container}>
            <img alt={alt} src={src} title={alt} className={styles.avatar} />
            {text && <strong>{text}</strong>}
        </div>
    );
};

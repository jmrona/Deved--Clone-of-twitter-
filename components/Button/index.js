import styles from "styles/components/Button/Button.module.css";

export const Button = ({ children, disabled, onClick }) => {
    return (
        <>
            <button
                onClick={onClick}
                disabled={disabled}
                className={styles.btn}
            >
                {children}
            </button>
        </>
    );
};

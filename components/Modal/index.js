import styles from "styles/components/Modal/Modal.module.css";
import ReactDOM from "react-dom";

import { useContext } from "react";
import { ModalContext } from "contexts/ModalContext";

export const Modal = ({ children, title }) => {
    let { modalContent, handleModal, modal } = useContext(ModalContext);
    if (!modal) return null;
    return ReactDOM.createPortal(
        <div className={styles.modal} onClick={() => handleModal()}>
            <div
                className={`${styles.modal__container} ${
                    modal === true && styles.modal__containerOpen
                }`}
            >
                {modalContent}
            </div>
        </div>,
        document.body
    );
};

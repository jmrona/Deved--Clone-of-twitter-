import { ModalContext } from "contexts/ModalContext";
import React, { useContext } from "react";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

import styles from "styles/components/Modal/Modal.module.css";

export const ModalSocialMedia = ({ url }) => {
    let { handleModal } = useContext(ModalContext);
    return (
        <div>
            <div className={styles.modal__header}>
                <h1>Share</h1>
            </div>
            <div className={styles.modal__body}>
                <div className={styles.socialMedia}>
                    <FacebookShareButton url={url}>
                        <FacebookIcon size={50} round={true} />
                    </FacebookShareButton>
                    <span>Facebook</span>
                </div>
                <div className={styles.socialMedia}>
                    <WhatsappShareButton url={url}>
                        <WhatsappIcon size={50} round={true} />
                    </WhatsappShareButton>
                    <span>Whatsapp</span>
                </div>
                <div className={styles.socialMedia}>
                    <LinkedinShareButton url={url}>
                        <LinkedinIcon size={50} round={true} />
                    </LinkedinShareButton>
                    <span>LinkedIn</span>
                </div>
                <div className={styles.socialMedia}>
                    <TwitterShareButton url={url}>
                        <TwitterIcon size={50} round={true} />
                    </TwitterShareButton>
                    <span>Twitter</span>
                </div>
            </div>
            <div className={styles.modal__footer}>
                <button
                    onClick={() => handleModal()}
                    className={styles.btn__cancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

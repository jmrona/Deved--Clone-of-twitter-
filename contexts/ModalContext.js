import { Modal } from "components/Modal";
import { useModal } from "hooks/useModal";
import React from "react";

let ModalContext;
let { Provider } = (ModalContext = React.createContext());

let ModalProvider = ({ children }) => {
    let { modal, handleModal, modalContent } = useModal();
    return (
        <Provider value={{ modal, handleModal, modalContent }}>
            <Modal />
            {children}
        </Provider>
    );
};

export { ModalContext, ModalProvider };

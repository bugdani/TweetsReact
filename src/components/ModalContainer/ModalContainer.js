import React from "react";
import { Modal } from "@material-ui/core";

import "./ModalContainer.scss";

export default function ModalContainer(props) {
  const { isOpenModal, closeModal, children } = props;
  return (
    <Modal className="modal-container" open={isOpenModal} onClose={closeModal}>
      <div>{children}</div>
    </Modal>
  );
}

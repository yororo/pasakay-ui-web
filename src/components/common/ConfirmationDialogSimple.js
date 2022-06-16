import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmationDialogSimple = ({
  showModal,
  onCancelClick,
  onConfirmClick,
  title,
  body,
}) => {
  return (
    <Modal show={showModal} onHide={onCancelClick}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancelClick}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirmClick}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialogSimple;

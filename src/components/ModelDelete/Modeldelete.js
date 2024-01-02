import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModelDetele = (props) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete A User </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you are to delete user{" "}
          <span className=" fw-bolder">{props.item.username}</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.cofirmuser}>
            Cofirm delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelDetele;

import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { CartProps, ModalOverlayProps, ModalProps } from "../../types";
import React from "react";

// darkened background that closes on click
const Backdrop = (props: CartProps) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

// modal window
const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

// identify the JSX element to display modal
const portalElement = document.getElementById("overlays")!;

const Modal = (props: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;

import { Fade, Modal, Backdrop } from "@material-ui/core";
import React from "react";

export interface ITransitionModalProps {
  open: boolean;
  className?: any;
  children: React.ReactNode;
  handleClose?(): Promise<void> | void;
}

const TransitionModal: React.FC<ITransitionModalProps> = ({
  open,
  handleClose,
  className,
  children
}) => (
  <Modal
    className={className}
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500
    }}
  >
    <Fade in={open}>{children}</Fade>
  </Modal>
);

export default TransitionModal;

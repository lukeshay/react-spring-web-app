import {
  Backdrop,
  createStyles,
  Fade,
  makeStyles,
  Modal,
  Theme
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      outline: 0
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      outline: 0,
      padding: theme.spacing(2, 4, 3)
    }
  })
);

export interface ITransitionModalProps {
  open: boolean;
  children: React.ReactNode;
  style?: any;
  handleClose?(): Promise<void> | void;
}

const TransitionModal: React.FC<ITransitionModalProps> = ({
  open,
  handleClose,
  style,
  children
}): JSX.Element => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.paper} style={style}>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

export default TransitionModal;

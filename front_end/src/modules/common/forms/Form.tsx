import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";

export interface IFormProps {
    buttonText: string;
    formInputs: React.ReactNode;
    title: React.ReactNode;
    helpElements?: React.ReactNode[];
    handleSubmit(event: any): Promise<void>;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1)
  },
  form: {
    marginTop: theme.spacing(1),
    width: "100%" // Fix IE 11 issue.
  },
  paper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(8)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Form: React.FC<IFormProps> = ({
  title,
  formInputs,
  buttonText,
  helpElements,
  handleSubmit
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {formInputs}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {buttonText}
          </Button>
          <Grid container>
            {helpElements &&
              helpElements.map((element) => (
                // tslint:disable-next-line: jsx-key
                <Grid item>{element}</Grid>
              ))}
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default React.memo(Form);

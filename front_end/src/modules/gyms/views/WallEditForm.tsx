import {
  Button,
  createStyles,
  FormGroup,
  FormHelperText,
  FormLabel,
  makeStyles,
  Theme
} from "@material-ui/core";
import React from "react";
import * as ReactRouter from "react-router";
import { Routes } from "../../../routes";
import { Wall } from "../../../types";
import Form from "../../common/forms/Form";
import CheckBox from "../../common/inputs/CheckBox";
import Input from "../../common/inputs/Input";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkboxGroup: {
      marginLeft: "145px"
    },
    helpText: {
      color: theme.palette.error.main,
      padding: "5px"
    }
  })
);

export interface IWallEditFormProps {
  wall: Wall;
}

const WallEditForm: React.FunctionComponent<IWallEditFormProps> = ({
  wall
}) => {
  const history = ReactRouter.useHistory();

  const classes = useStyles();

  const [name, setName] = React.useState<string>(wall.name);
  const [lead, setLead] = React.useState<boolean>(
    wall.types.filter((element) => element === "LEAD").length > 0
  );
  const [topRope, setTopRope] = React.useState<boolean>(
    wall.types.filter((element) => element === "TOP_ROPE").length > 0
  );
  const [autoBelay, setAutoBelay] = React.useState<boolean>(
    wall.types.filter((element) => element === "AUTO_BELAY").length > 0
  );
  const [boulder, setBoulder] = React.useState<boolean>(
    wall.types.filter((element) => element === "BOULDER").length > 0
  );
  const [typesMessage, setTypesMessage] = React.useState<string>("");
  const [nameMessage, setNameMessage] = React.useState<string>("");

  const handleChange = (event: any) => {
    const { id, value } = event.target;

    if (id === "name") {
      setName(value);
    } else if (id === "topRope") {
      setTopRope(!topRope);
    } else if (id === "lead") {
      setLead(!lead);
    } else if (id === "autoBelay") {
      setAutoBelay(!autoBelay);
    } else if (id === "boulder") {
      setBoulder(!boulder);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const types: string[] = [];

    if (lead) {
      types.push("LEAD");
    }

    if (topRope) {
      types.push("TOP_ROPE");
    }

    if (autoBelay) {
      types.push("AUTO_BELAY");
    }

    if (boulder) {
      types.push("BOULDER");
    }

    if (types.length === 0) {
      setTypesMessage("Select a type.");
    }

    if (name.trim().length === 0) {
      setNameMessage("Name cannot be blank.");
    }

    if (types.length !== 0 && name.trim().length !== 0) {
      setTypesMessage("");
      setNameMessage("");
    }
  };

  const handleCancel = () => {
    history.push(Routes.GYMS + "/" + wall.gymId);
  };

  const FormHead: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        Update Wall
      </div>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <Button onClick={handleCancel} type="button" variant="outlined">
          Cancel
        </Button>
      </div>
    </div>
  );

  const FormInputs: JSX.Element = (
    <React.Fragment>
      <Input
        placeholder="Name"
        id="name"
        value={name}
        handleChange={handleChange}
        type="text"
        autoComplete="name"
        autoCapitalize="true"
        helpText={nameMessage}
      />
      <FormLabel component="legend">Pick one</FormLabel>
      <FormGroup>
        <CheckBox
          id="topRope"
          checked={topRope}
          value="TOP_ROPE"
          label="Top rope"
          onChange={handleChange}
          className={classes.checkboxGroup}
          color="primary"
        />
        <CheckBox
          id="lead"
          checked={lead}
          value="LEAD"
          label="Lead"
          onChange={handleChange}
          className={classes.checkboxGroup}
          color="primary"
        />
        <CheckBox
          id="autoBelay"
          checked={autoBelay}
          value="AUTO_BELAY"
          label="Auto belay"
          onChange={handleChange}
          className={classes.checkboxGroup}
          color="primary"
        />
        <CheckBox
          id="boulder"
          checked={boulder}
          value="BOULDER"
          label="Boulder"
          onChange={handleChange}
          className={classes.checkboxGroup}
          color="primary"
        />
        <FormHelperText className={classes.helpText}>
          {typesMessage}
        </FormHelperText>
      </FormGroup>
    </React.Fragment>
  );

  return (
    <Form
      title={FormHead}
      formInputs={FormInputs}
      buttonText="Update wall"
      handleSubmit={handleSubmit}
    />
  );
};

export default WallEditForm;

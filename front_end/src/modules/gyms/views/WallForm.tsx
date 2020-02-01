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
import { Wall } from "../../../types";
import Form from "../../common/forms/Form";
import CheckBox from "../../common/inputs/CheckBox";
import Input from "../../common/inputs/Input";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    helpText: {
      color: theme.palette.error.main,
      padding: "5px"
    }
  })
);

export interface IWallFormProps {
  wall: Wall;
  formHeadText: string;
  nameMessage?: string;
  submitButtonText: string;
  typesMessage?: string;
  handleCancel(event: any): Promise<void> | void;
  handleSubmit(wall: Wall): Promise<void> | void;
}

const WallForm: React.FC<IWallFormProps> = ({
  wall,
  formHeadText,
  nameMessage,
  submitButtonText,
  typesMessage,
  handleCancel,
  handleSubmit
}): JSX.Element => {
  const classes = useStyles();

  const [name, setName] = React.useState<string>(wall.name);
  const [lead, setLead] = React.useState<boolean>(
    wall.types && wall.types.filter((element) => element === "LEAD").length > 0
  );
  const [topRope, setTopRope] = React.useState<boolean>(
    wall.types &&
      wall.types.filter((element) => element === "TOP_ROPE").length > 0
  );
  const [autoBelay, setAutoBelay] = React.useState<boolean>(
    wall.types &&
      wall.types.filter((element) => element === "AUTO_BELAY").length > 0
  );
  const [boulder, setBoulder] = React.useState<boolean>(
    wall.types &&
      wall.types.filter((element) => element === "BOULDER").length > 0
  );

  const handleChange = async (event: any): Promise<void> => {
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

  const onSubmit = (event: any): void => {
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

    handleSubmit({ name, types } as Wall);
  };

  const FormHead: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        {formHeadText}
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
        onChange={handleChange}
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
          color="primary"
        />
        <CheckBox
          id="lead"
          checked={lead}
          value="LEAD"
          label="Lead"
          onChange={handleChange}
          color="primary"
        />
        <CheckBox
          id="autoBelay"
          checked={autoBelay}
          value="AUTO_BELAY"
          label="Auto belay"
          onChange={handleChange}
          color="primary"
        />
        <CheckBox
          id="boulder"
          checked={boulder}
          value="BOULDER"
          label="Boulder"
          onChange={handleChange}
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
      buttonText={submitButtonText}
      handleSubmit={onSubmit}
    />
  );
};

export default WallForm;

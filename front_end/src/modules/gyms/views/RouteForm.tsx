import {
  createStyles,
  makeStyles,
  Theme,
  Button,
  FormLabel,
  FormGroup,
  FormHelperText
} from "@material-ui/core";
import React from "react";
import { Route } from "../../../types";
import Form from "../../common/forms/Form";
import Input from "../../common/inputs/Input";
import CheckBox from "../../common/inputs/CheckBox";

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

export interface IRouteFormProps {
  route: Route;
  formHeadText: string;
  nameMessage?: string;
  submitButtonText: string;
  typesMessage?: string;
  handleCancel(event: any): Promise<void> | void;
  handleSubmit(route: Route): Promise<void> | void;
}

const RouteForm: React.FC<IRouteFormProps> = ({
  route,
  formHeadText,
  nameMessage,
  submitButtonText,
  typesMessage,
  handleCancel,
  handleSubmit
}) => {
  const classes = useStyles();

  const [name, setName] = React.useState<string>(route.name);
  const [setter, setSetter] = React.useState<string>(route.setter);

  const [lead, setLead] = React.useState<boolean>(
    route.types.filter((element) => element === "LEAD").length > 0
  );
  const [topRope, setTopRope] = React.useState<boolean>(
    route.types.filter((element) => element === "TOP_ROPE").length > 0
  );
  const [autoBelay, setAutoBelay] = React.useState<boolean>(
    route.types.filter((element) => element === "AUTO_BELAY").length > 0
  );
  const [boulder, setBoulder] = React.useState<boolean>(
    route.types.filter((element) => element === "BOULDER").length > 0
  );
  const [holdColor, setHoldColor] = React.useState<string>(route.holdColor);
  const [gymId, setGymId] = React.useState<string>(route.gymId);
  const [wallId, setWallId] = React.useState<string>(route.wallId);

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
    } else if (id === "setter") {
      setSetter(value);
    } else if (id === "holdColor") {
      setHoldColor(value);
    }
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
        handleChange={handleChange}
        type="text"
        autoComplete="title"
        autoCapitalize="true"
        helpText={nameMessage}
      />
      <Input
        placeholder="Setter"
        id="setter"
        value={setter}
        handleChange={handleChange}
        type="text"
        autoComplete="name"
        autoCapitalize="true"
      />
      <Input
        placeholder="Hold Color"
        id="holdColor"
        value={name}
        handleChange={handleChange}
        type="text"
        autoCapitalize="true"
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
      buttonText={submitButtonText}
      handleSubmit={handleSubmit}
    />
  );
};

export default RouteForm;

import {
  FormGroup,
  FormLabel,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";
import React, { useEffect } from "react";
import * as ReactRouter from "react-router";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import * as UrlUtils from "../../../utils/urlUtils";
import Button from "../../common/buttons/ButtonSecondary";
import Form from "../../common/forms/Form";
import CheckBox from "../../common/inputs/CheckBox";
import Input from "../../common/inputs/Input";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkboxGroup: {
      marginLeft: "145px"
    }
  })
);

const WallAddPage: React.FunctionComponent = () => {
  const classes = useStyles();

  const history = ReactRouter.useHistory();

  const [name, setName] = React.useState<string>("");
  const [gymId, setGymId] = React.useState<string>("");
  const [lead, setLead] = React.useState<boolean>(false);
  const [topRope, setTopRope] = React.useState<boolean>(false);
  const [autoBelay, setAutoBelay] = React.useState<boolean>(false);
  const [boulder, setBoulder] = React.useState<boolean>(false);

  const { state: gymsState } = useGymsContext();
  const { state: userState } = useUserContext();

  useEffect(() => {
    const currentGymId = UrlUtils.getLastPathVariable(
      history.location.pathname
    );

    setGymId(currentGymId);

    const tempGym = gymsState.gyms
      .filter((element) => element.id === currentGymId)
      .pop();

    const { user } = userState;

    if (
      !tempGym ||
      !user ||
      (tempGym &&
        (!tempGym.authorizedEditors ||
          !tempGym.authorizedEditors.find(
            (editorId: string) => editorId === user.userId
          )))
    ) {
      history.push(Routes.GYMS + "/" + gymId);
    }
  }, []);

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

  const handleSubmit = () => {
    const types;
  };

  const handleCancel = () => {
    history.push(Routes.GYMS + "/" + gymId);
  };

  const FormHead: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        Add Wall
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
        />
        <CheckBox
          id="lead"
          checked={lead}
          value="LEAD"
          label="Lead"
          onChange={handleChange}
          className={classes.checkboxGroup}
        />
        <CheckBox
          id="autoBelay"
          checked={autoBelay}
          value="AUTO_BELAY"
          label="Auto belay"
          onChange={handleChange}
          className={classes.checkboxGroup}
        />
        <CheckBox
          id="boulder"
          checked={boulder}
          value="BOULDER"
          label="Boulder"
          onChange={handleChange}
          className={classes.checkboxGroup}
        />
      </FormGroup>
    </React.Fragment>
  );

  return (
    <Form
      title={FormHead}
      formInputs={FormInputs}
      buttonText="Add wall"
      handleSubmit={handleSubmit}
    />
  );
};

export default WallAddPage;

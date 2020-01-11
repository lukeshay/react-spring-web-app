import React from "react";
import * as ReactRouter from "react-router";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import Input from "../../common/inputs/Input";
import Form from "../../common/forms/Form";
import Button from "../../common/buttons/ButtonSecondary";

const GymEditPage: React.FunctionComponent = () => {
  const history = ReactRouter.useHistory();
  const [gymId] = React.useState<string | undefined>(
    history.location.pathname
      .split("/")
      .splice(-1)
      .pop()
  );
  const [gym, setGym] = React.useState<Gym>({} as Gym);
  const [name, setName] = React.useState<string>("");
  const [website, setWebsite] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [state, setState] = React.useState<string>("");
  const [zipCode, setZipCode] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");

  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: userState, dispatch: userDispatch } = useUserContext();

  React.useEffect(() => {
    const tempGym = gymsState.gyms
      .filter((element) => element.id === gymId)
      .pop();

    const { user } = userState;

    if (
      tempGym &&
      user &&
      tempGym.authorizedEditors &&
      tempGym.authorizedEditors.find(
        (editorId: string) => editorId === user.userId
      )
    ) {
      setGym(tempGym);
    } else {
      history.push(Routes.GYMS + "/" + gymId);
    }
  });

  const handleChange = async (event: any): Promise<void> => {};

  const handleSubmit = async (event: any): Promise<void> => {};

  const handleCancel = async (event: any): Promise<void> => {};

  const FormInputs: JSX.Element = (
    <React.Fragment>
      <Input
        placeholder="Name"
        id="name"
        value={name}
        handleChange={handleChange}
        type="text"
        autoComplete="organization"
        autoCapitalize="true"
      />
      <Input
        placeholder="Website"
        id="website"
        value={website}
        handleChange={handleChange}
        type="text"
        autoComplete="website"
      />
      <Input
        placeholder="Address"
        id="address"
        value={address}
        handleChange={handleChange}
        type="text"
        autoComplete="street-address"
      />
      <Input
        placeholder="City"
        id="city"
        value={city}
        handleChange={handleChange}
        type="text"
        autoComplete="city"
        autoCapitalize="true"
      />
      <Input
        placeholder="State"
        id="state"
        value={state}
        handleChange={handleChange}
        type="text"
        autoComplete="state"
        autoCapitalize="true"
      />
      <Input
        placeholder="Zip Code"
        id="zipCode"
        value={zipCode}
        handleChange={handleChange}
        type="text"
        autoComplete="zipcode"
      />
      <Input
        placeholder="Email"
        id="email"
        value={email}
        handleChange={handleChange}
        type="text"
        autoComplete="email"
      />
      <Input
        placeholder="Phone Number"
        id="phoneNumber"
        value={phoneNumber}
        handleChange={handleChange}
        type="text"
        autoComplete="phone-number"
      />
    </React.Fragment>
  );

  const FormHead: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        Update Gym
      </div>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <Button onClick={handleCancel} type="button" variant="outlined">
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      buttonText={"Save"}
      formInputs={FormInputs}
      handleSubmit={handleSubmit}
      title={FormHead}
    />
  );
};

export default GymEditPage;

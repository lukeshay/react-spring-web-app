import React from "react";
import ReactRouter from "react-router";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import * as RegexUtils from "../../../utils/regexUtils";
import Button from "../../common/buttons/ButtonSecondary";
import Form from "../../common/forms/Form";
import Input from "../../common/inputs/Input";

export interface IGymEditPageProps {
  gym: Gym;
}

const GymEditForm: React.FunctionComponent<IGymEditPageProps> = ({ gym }) => {
  const history = ReactRouter.useHistory();
  const [gymId] = React.useState<string>(gym.id);
  const [name, setName] = React.useState<string>(gym.name);
  const [website, setWebsite] = React.useState<string>(gym.website);
  const [websiteMessage, setWebsiteMessage] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>(gym.address);
  const [addressMessage, setAddressMessage] = React.useState<string>("");
  const [city, setCity] = React.useState<string>(gym.city);
  const [cityMessage, setCityMessage] = React.useState<string>("");
  const [state, setState] = React.useState<string>(gym.state);
  const [stateMessage, setStateMessage] = React.useState<string>("");
  const [zipCode, setZipCode] = React.useState<string>(gym.zipCode);
  const [zipCodeMessage, setZipCodeMessage] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>(gym.email);
  const [emailMessage, setEmailMessage] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>(gym.phoneNumber);
  const [phoneNumberMessage, setPhoneNumberMessage] = React.useState<string>(
    ""
  );

  const { dispatch: gymsDispatch } = useGymsContext();

  React.useEffect(() => {
    if (RegexUtils.containsSpecialCharacter(address)) {
      setAddressMessage("Addresses cannot contain special characters.");
    } else {
      setAddressMessage("");
    }
  }, [address]);

  React.useEffect(() => {
    if (RegexUtils.containsSpecialCharacter(city)) {
      setCityMessage("Cities cannot contain special characters.");
    } else if (RegexUtils.containsNumber(city)) {
      setCityMessage("Cite cannot contain numbers.");
    } else {
      setCityMessage("");
    }
  }, [city]);

  React.useEffect(() => {
    if (RegexUtils.containsSpecialCharacter(state)) {
      setStateMessage("States cannot contain special characters.");
    } else if (RegexUtils.containsNumber(state)) {
      setStateMessage("States cannot contain numbers.");
    } else {
      setStateMessage("");
    }
  }, [state]);

  React.useEffect(() => {
    if (!RegexUtils.containsOnlyNumbers(zipCode)) {
      setZipCodeMessage("Zip codes can only have numbers.");
    } else {
      setZipCodeMessage("");
    }
  }, [zipCode]);

  React.useEffect(() => {
    if (!RegexUtils.validEmail(email)) {
      setEmailMessage("Invalid email format.");
    } else {
      setEmailMessage("");
    }
  }, [email]);

  React.useEffect(() => {
    if (!RegexUtils.containsOnlyNumbers(phoneNumber)) {
      setPhoneNumberMessage("Phone numbers can only contain numbers");
    } else if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      setPhoneNumberMessage("Phone number must be 10 digits long.");
    } else {
      setPhoneNumberMessage("");
    }
  }, [phoneNumber]);

  const handleChange = async (event: any) => {
    event.preventDefault();
    const { id, value } = event.target;

    switch (id) {
      case "name":
        setName(value);
        return;
      case "website":
        setWebsite(value);
        return;
      case "address":
        setAddress(value);
        return;
      case "city":
        setCity(value);
        return;
      case "state":
        setState(value);
        return;
      case "zipCode":
        setZipCode(value);
        return;
      case "email":
        setEmail(value);
        return;
      case "phoneNumber":
        setPhoneNumber(value);
        return;

      default:
        return;
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    GymsActions.updateGym(
      gymsDispatch,
      {
        address,
        city,
        email,
        id: gym.id,
        name,
        phoneNumber,
        state,
        website,
        zipCode
      } as Gym,
      gym
    ).then((response) => {
      if (response instanceof Response && response.status === 200) {
        toast.success("Gym updated.");
      } else {
        toast.error("Error updating gym.");
      }
    });
  };

  const handleCancel = () => {
    history.push(Routes.GYMS + "/" + gymId);
  };

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
        helpText={websiteMessage}
      />
      <Input
        placeholder="Address"
        id="address"
        value={address}
        handleChange={handleChange}
        type="text"
        autoComplete="street-address"
        helpText={addressMessage}
      />
      <Input
        placeholder="City"
        id="city"
        value={city}
        handleChange={handleChange}
        type="text"
        autoComplete="city"
        autoCapitalize="true"
        helpText={cityMessage}
      />
      <Input
        placeholder="State"
        id="state"
        value={state}
        handleChange={handleChange}
        type="text"
        autoComplete="state"
        autoCapitalize="true"
        helpText={stateMessage}
      />
      <Input
        placeholder="Zip Code"
        id="zipCode"
        value={zipCode}
        handleChange={handleChange}
        type="text"
        autoComplete="zip-code"
        helpText={zipCodeMessage}
      />
      <Input
        placeholder="Email"
        id="email"
        value={email}
        handleChange={handleChange}
        type="text"
        autoComplete="email"
        helpText={emailMessage}
      />
      <Input
        placeholder="Phone Number"
        id="phoneNumber"
        value={phoneNumber}
        handleChange={handleChange}
        type="text"
        autoComplete="phone-number"
        helpText={phoneNumberMessage}
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

export default GymEditForm;

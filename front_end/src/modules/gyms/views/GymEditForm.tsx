import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PublishIcon from "@material-ui/icons/Publish";
import React from "react";
import * as ReactRouter from "react-router";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import * as RegexUtils from "../../../utils/regexUtils";
import Button from "../../common/buttons/Button";
import Form from "../../common/forms/Form";
import ImageInput from "../../common/inputs/ImageInput";
import Input from "../../common/inputs/Input";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      paddingRight: theme.spacing(1)
    },
    photo: {
      maxWidth: "100%",
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1)
    },
    uploadButtonWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "100%"
    }
  })
);

export interface IGymEditPageProps {
  gym: Gym;
  handleSubmit(updatedGym: Gym, photo: File | null, logo: File | null): void;
}

const GymEditForm: React.FunctionComponent<IGymEditPageProps> = ({
  gym,
  handleSubmit
}): JSX.Element => {
  const classes = useStyles();

  const history = ReactRouter.useHistory();

  const [gymId] = React.useState<string>(gym.id);
  const [name, setName] = React.useState<string>(gym.name);
  const [website, setWebsite] = React.useState<string>(gym.website);
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
  const [photo, setPhoto] = React.useState<File | null>(null);
  const [logo, setLogo] = React.useState<File | null>(null);

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

  const handleChange = async (event: any): Promise<void> => {
    event.preventDefault();
    const { id, value, files } = event.target;

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
      case "photo":
        setPhoto(files[0]);
        return;
      case "logo":
        setLogo(files[0]);
        return;

      default:
        return;
    }
  };

  const handleSubmitWrapper = (event: any): void => {
    event.preventDefault();

    handleSubmit(
      {
        address,
        city,
        email,
        name,
        phoneNumber,
        state,
        website,
        zipCode
      } as Gym,
      photo,
      logo
    );
  };

  const handleCancel = (): void => {
    history.push(Routes.GYMS + "/" + gymId);
  };

  const FormInputs: JSX.Element = (
    <React.Fragment>
      <Typography variant="h6">Gym Photo</Typography>
      <ImageInput
        src={photo ? URL.createObjectURL(photo) : "https://" + gym.photoUrl}
        alt="No photo yet"
        imgClassName={classes.photo}
        accept="image/*,.jpg,.png,.jpeg"
        multiple={false}
        id="photo"
        onChange={handleChange}
      >
        <Button
          variant="contained"
          component="span"
          fullWidth={false}
          color="primary"
        >
          <PublishIcon className={classes.icons} />
          Upload Gym Photo
        </Button>
      </ImageInput>
      <Typography variant="h6">Gym Logo</Typography>
      <ImageInput
        src={logo ? URL.createObjectURL(logo) : "https://" + gym.logoUrl}
        alt="No logo yet"
        imgClassName={classes.photo}
        accept="image/*,.jpg,.png,.jpeg"
        multiple={false}
        id="logo"
        onChange={handleChange}
      >
        <Button
          variant="contained"
          component="span"
          fullWidth={false}
          color="primary"
        >
          <PublishIcon className={classes.icons} />
          Upload Gym Logo
        </Button>
      </ImageInput>
      <Input
        placeholder="Name"
        id="name"
        value={name}
        onChange={handleChange}
        type="text"
        autoComplete="organization"
        autoCapitalize="true"
      />
      <Input
        placeholder="Website"
        id="website"
        value={website}
        onChange={handleChange}
        type="text"
        autoComplete="website"
      />
      <Input
        placeholder="Address"
        id="address"
        value={address}
        onChange={handleChange}
        type="text"
        autoComplete="street-address"
        helpText={addressMessage}
      />
      <Input
        placeholder="City"
        id="city"
        value={city}
        onChange={handleChange}
        type="text"
        autoComplete="city"
        autoCapitalize="true"
        helpText={cityMessage}
      />
      <Input
        placeholder="State"
        id="state"
        value={state}
        onChange={handleChange}
        type="text"
        autoComplete="state"
        autoCapitalize="true"
        helpText={stateMessage}
      />
      <Input
        placeholder="Zip Code"
        id="zipCode"
        value={zipCode}
        onChange={handleChange}
        type="text"
        autoComplete="zip-code"
        helpText={zipCodeMessage}
      />
      <Input
        placeholder="Email"
        id="email"
        value={email}
        onChange={handleChange}
        type="text"
        autoComplete="email"
        helpText={emailMessage}
      />
      <Input
        placeholder="Phone Number"
        id="phoneNumber"
        value={phoneNumber}
        onChange={handleChange}
        type="text"
        autoComplete="phone-number"
        helpText={phoneNumberMessage}
      />
    </React.Fragment>
  );

  const FormHead: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        Edit Gym
      </div>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <Button
          onClick={handleCancel}
          type="button"
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      buttonText={"Save"}
      formInputs={FormInputs}
      handleSubmit={handleSubmitWrapper}
      title={FormHead}
    />
  );
};

export default GymEditForm;

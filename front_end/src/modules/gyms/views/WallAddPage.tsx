import React from "react";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { Wall } from "../../../types";
import TransitionModal from "../../common/modal/Modal";
import WallForm from "./WallForm";

export interface IWallAddPageProps {
  gymId: string;
  open: boolean;
  handleClose(): Promise<void> | void;
}

const WallAddPage: React.FC<IWallAddPageProps> = ({
  gymId,
  open,
  handleClose
}): JSX.Element => {
  const [wall, setWall] = React.useState<Wall>({} as Wall);
  const [typesMessage, setTypesMessage] = React.useState<string>("");
  const [nameMessage, setNameMessage] = React.useState<string>("");

  const { dispatch: gymsDispatch } = useGymsContext();

  const handleSubmit = (returnWall: Wall): void => {
    const newWall = { gymId, ...returnWall };

    setWall(newWall);

    if (newWall.types.length === 0) {
      setTypesMessage("Select a type.");
    } else {
      setTypesMessage("");
    }

    if (newWall.name.trim().length === 0) {
      setNameMessage("Name cannot be blank.");
    } else {
      setNameMessage("");
    }

    if (newWall.types.length !== 0 && newWall.name.trim().length !== 0) {
      setTypesMessage("");
      setNameMessage("");
      GymsActions.createWall(gymsDispatch, newWall, gymId).then((response) => {
        if (response instanceof Response && response.ok) {
          setWall({} as Wall);
          handleClose();
        } else {
          toast.error("Error updating wall.");
        }
      });
    }
  };

  if (gymId !== "") {
    return (
      <TransitionModal
        open={open}
        handleClose={handleClose}
        style={{ width: "475px" }}
      >
        <WallForm
          formHeadText="Add wall"
          wall={wall}
          handleCancel={handleClose}
          handleSubmit={handleSubmit}
          submitButtonText="Add wall"
          nameMessage={nameMessage}
          typesMessage={typesMessage}
        />
      </TransitionModal>
    );
  } else {
    return <React.Fragment />;
  }
};

export default WallAddPage;

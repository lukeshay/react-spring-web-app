import React from "react";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { Wall } from "../../../types";
import TransitionModal from "../../common/modal/Modal";
import WallForm from "./WallForm";

export interface IWallEditPageProps {
  gymId: string;
  open: boolean;
  wall: Wall;
  handleClose(): Promise<void> | void;
}

const WallEditPage: React.FC<IWallEditPageProps> = ({
  gymId,
  open,
  wall,
  handleClose
}): JSX.Element => {
  const [updatedWall, setUpdatedWall] = React.useState<Wall>(wall);
  const [typesMessage, setTypesMessage] = React.useState<string>("");
  const [nameMessage, setNameMessage] = React.useState<string>("");

  const { dispatch: gymsDispatch } = useGymsContext();

  const handleSubmit = (returnWall: Wall): void => {
    const newWall = { id: wall.id, gymId, ...returnWall };

    setUpdatedWall(newWall);

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
      GymsActions.updateWall(gymsDispatch, newWall, gymId).then((response) => {
        if (response instanceof Response && response.ok) {
          handleClose();
        } else {
          toast.error("Error updating wall.");
        }
      });
    }
  };

  return (
    <TransitionModal
      open={open}
      handleClose={handleClose}
      style={{ width: "475px" }}
    >
      <WallForm
        formHeadText="Edit wall"
        wall={updatedWall}
        handleCancel={handleClose}
        handleSubmit={handleSubmit}
        submitButtonText="Save"
        nameMessage={nameMessage}
        typesMessage={typesMessage}
      />
    </TransitionModal>
  );
};

export default WallEditPage;

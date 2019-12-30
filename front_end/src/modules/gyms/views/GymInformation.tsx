import React, { useEffect, useState } from "react";
import * as GymsActions from "../../../state/gyms/gymsActions";
import gymsStore from "../../../state/gyms/gymsStore";
import { Gym } from "../../../types";
import Table from "../../common/table/Table";
import TableBody from "../../common/table/TableBody";

interface IGymInformationRowProps {
  label: string;
  text: string;
}

const GymInformationRow: React.FC<IGymInformationRowProps> = ({
  label,
  text
}) => (
  <tr>
    <td>{label}</td>
    <td>{text}</td>
  </tr>
);

export interface IGymInformationProps {
  gymId: string;
}

const GymInformation: React.FC<IGymInformationProps> = ({ gymId }) => {
  const [gym, setGym] = useState<Gym>({} as Gym);

  useEffect(() => {
    gymsStore.addChangeListener(handleGymsChange);

    if (gymsStore.getGyms().length === 0) {
      GymsActions.loadGyms();
    }

    const tempGym = gymsStore
      .getGyms()
      .filter((element) => element.id === gymId)
      .pop();

    if (tempGym) {
      setGym(tempGym);
    }

    return () => gymsStore.removeChangeListener(handleGymsChange);
  }, []);

  async function handleGymsChange(): Promise<void> {
    const tempGym = gymsStore
      .getGyms()
      .filter((element) => element.id === gymId)
      .pop();

    if (tempGym) {
      setGym(tempGym);
    }
  }

  if (!gym) {
    return <h3>Cannot find the gym you are looking for.</h3>;
  }

  return (
    <Table>
      <TableBody>
        <GymInformationRow label="Gym Name" text={gym.name} />
        <GymInformationRow label="Gym Website" text={gym.website} />
        <GymInformationRow
          label="Gym Address"
          text={gym.address + " " + gym.city + ", " + gym.state}
        />
        <GymInformationRow label="Gym Email" text={gym.email} />
        <GymInformationRow label="Gym Phone Number" text={gym.phoneNumber} />
      </TableBody>
    </Table>
  );
};

export default React.memo(GymInformation);

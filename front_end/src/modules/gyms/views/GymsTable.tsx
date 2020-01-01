import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as GymsActions from "../../../state/gyms/gymsActions";
import gymsStore from "../../../state/gyms/gymsStore";
import { Gym } from "../../../types";
import Table from "../../common/table/Table2";
import { useHistory } from "react-router-dom";

interface IGymRowProps {
  gym: Gym;
}

const GymRow: React.FC<IGymRowProps> = React.memo(({ gym }) => {
  const history = useHistory();

  return (
    <TableRow hover onClick={() => history.push("/gyms/" + gym.id)}>
      <TableCell>{gym.name}</TableCell>
      <TableCell>{gym.address + " " + gym.city + ", " + gym.state}</TableCell>
      <TableCell>{gym.website}</TableCell>
    </TableRow>
  );
});

const GymsPage: React.FC = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);

  useEffect(() => {
    gymsStore.addChangeListener(handleGymsChange);

    if (gymsStore.getGyms().length === 0) {
      GymsActions.loadGyms();
    }

    setGyms(gymsStore.getGyms());

    return () => gymsStore.removeChangeListener(handleGymsChange);
  }, []);

  async function handleGymsChange(): Promise<void> {
    setGyms(gymsStore.getGyms());
  }

  return (
    <Table
      head={
        <React.Fragment>
          <TableCell>Gym</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Website</TableCell>
        </React.Fragment>
      }
      body={gyms.map((gym) => (
        <GymRow key={gym.id} gym={gym} />
      ))}
    />
  );
};

export default React.memo(GymsPage);

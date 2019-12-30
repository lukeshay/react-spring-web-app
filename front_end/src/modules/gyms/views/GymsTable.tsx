import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as GymsActions from "../../../state/gyms/gymsActions";
import gymsStore from "../../../state/gyms/gymsStore";
import { Gym } from "../../../types";
import Table from "../../common/table/Table";
import TableBody from "../../common/table/TableBody";
import TableHead from "../../common/table/TableHead";

interface IGymRowProps {
  gym: Gym;
}

const GymRow: React.FC<IGymRowProps> = React.memo(({ gym }) => (
  <tr>
    <td>
      <NavLink to={"/gyms/" + gym.id} className="nav-link">
        {gym.name}
      </NavLink>
    </td>
    <td>{gym.address + " " + gym.city + ", " + gym.state}</td>
    <td>{gym.website}</td>
  </tr>
));

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
    <Table>
      <TableHead>
        <td>Gym</td>
        <td>Location</td>
        <td>Website</td>
      </TableHead>
      <TableBody>
        {gyms.map((gym) => (
          <GymRow key={gym.id} gym={gym} />
        ))}
      </TableBody>
    </Table>
  );
};

export default React.memo(GymsPage);

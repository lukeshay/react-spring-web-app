import { TableCell, TableRow } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { GymsContext } from "../../../context/gyms/gymsStore";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import Table from "../../common/table/Table";

interface IGymRowProps {
  gym: Gym;
}

const GymRow: React.FC<IGymRowProps> = React.memo(({ gym }) => {
  const history = useHistory();

  return (
    <TableRow hover onClick={() => history.push(Routes.GYMS + "/" + gym.id)}>
      <TableCell>{gym.name}</TableCell>
      <TableCell>
        {gym.address}
        <br />
        {gym.city + ", " + gym.state + " " + gym.zipCode}
      </TableCell>
      <TableCell>{gym.website}</TableCell>
    </TableRow>
  );
});

const GymsPage: React.FC = () => {
  const { state, dispatch } = useContext(GymsContext);

  useEffect(() => {
    loadGyms();
  }, []);

  const loadGyms = async () => {
    const response = await GymsActions.loadGyms(dispatch);

    if (!response || !(response instanceof Response) || !response.ok) {
      toast.error("Error getting gyms.");
    }
  };

  return (
    <Table
      head={
        <React.Fragment>
          <TableCell>Gym</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Website</TableCell>
        </React.Fragment>
      }
      body={state.gyms.map((gym) => (
        <GymRow key={gym.id} gym={gym} />
      ))}
    />
  );
};

export default React.memo(GymsPage);

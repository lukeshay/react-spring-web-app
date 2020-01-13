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

const GymRow: React.FC<IGymRowProps> = ({ gym }) => {
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
};

const GymsPage: React.FC = () => {
  const { state, dispatch } = useContext(GymsContext);

   React.useEffect(() => {
    loadGyms();
  }, []);

  const loadGyms = async () => {
    if (state.gyms.length === 0) {
      const response = await GymsActions.loadGyms(dispatch);

      if (!response || !(response instanceof Response) || !response.ok) {
        toast.error("Error getting gyms.");
      }
    }
  };

  return (
    <Table
      head={
        <TableRow>
          <TableCell key="gym">Gym</TableCell>
          <TableCell key="location">Location</TableCell>
          <TableCell key="website">Website</TableCell>
        </TableRow>
      }
      body={state.gyms.map((gym) => (
        <GymRow key={gym.id} gym={gym} />
      ))}
    />
  );
};

export default GymsPage;

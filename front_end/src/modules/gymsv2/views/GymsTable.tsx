import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as GymsApi from "../../../api/gymsApi";
import { StoreContext } from "../../../context/gyms/gymsStore";
import { Routes } from "../../../routes";
import * as GymsActions from "../../../state/gyms/gymsActions";
import gymsStore from "../../../state/gyms/gymsStore";
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
      <TableCell>{gym.address + " " + gym.city + ", " + gym.state}</TableCell>
      <TableCell>{gym.website}</TableCell>
    </TableRow>
  );
});

const GymsPage: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    if (state.gyms.length === 0) {
      GymsApi.getGyms().then((response: Response) => {
        if (response && response instanceof Response && response.ok) {
          response
            .json()
            .then((gyms: Gym[]) => dispatch({ actionType: "LOAD_GYMS", gyms }));
        }
      });
    }
  }, []);

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

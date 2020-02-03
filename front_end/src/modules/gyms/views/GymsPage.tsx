import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import Table from "../../common/table/Table";
import Input from "../../common/inputs/Input";

interface IGymRowProps {
  gym: Gym;
}

const GymRow: React.FC<IGymRowProps> = ({ gym }): JSX.Element => {
  const history = useHistory();

  return (
    <TableRow
      hover
      onClick={(): void => history.push(Routes.GYMS + "/" + gym.id)}
    >
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

const GymsPage: React.FC = (): JSX.Element => {
  const { state, dispatch } = useGymsContext();

  const [search, setSearch] = React.useState<string>("");

  const loadGyms = (): void => {
    if (state.gyms.length === 0) {
      GymsActions.loadGyms(dispatch).then((response) => {
        if (!response || !(response instanceof Response) || !response.ok) {
          toast.error("Error getting gyms.");
        }
      });
    }
  };

  React.useEffect(() => {
    loadGyms();
  }, []);

  return (
    <React.Fragment>
      <Input
        type="text"
        id="search"
        placeholder="Search"
        fullWidth={false}
        onChange={(event: any): void => {
          setSearch(event.target.value);
        }}
        value={search}
        name="search"
      />
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
    </React.Fragment>
  );
};

export default React.memo(GymsPage);

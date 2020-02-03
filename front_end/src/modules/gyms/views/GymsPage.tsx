import {
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Theme
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import Table from "../../common/table/Table";
import Input from "../../common/inputs/Input";
import { useViewContext } from "../../../context/view/viewStore";

const useStyles = makeStyles(() =>
  createStyles({
    div: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "100%"
    },
    search: {
      width: "60%"
    },
    searchMobile: {
      width: "96%"
    }
  })
);

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
  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: viewState, dispatch: viewDispatch } = useViewContext();

  const [search, setSearch] = React.useState<string>("");

  const classes = useStyles();

  const loadGyms = (): void => {
    if (gymsState.gyms.length === 0) {
      GymsActions.loadGymsQuery(gymsDispatch, "").then((response) => {
        if (!response || !(response instanceof Response) || !response.ok) {
          toast.error("Error getting gyms.");
        }
      });
    }
  };

  React.useEffect(() => {
    loadGyms();
  }, []);

  const searchClass = (): string => {
    return viewState.mobile ? classes.searchMobile : classes.search;
  };

  const handleKeyPress = (event: any): void => {
    if (event.key === "Enter")
      GymsActions.loadGymsQuery(gymsDispatch, search).then((response) => {
        if (!response || !(response instanceof Response) || !response.ok) {
          toast.error("Error getting gyms.");
        }
      });{
    }
  };

  return (
    <React.Fragment>
      <div className={classes.div}>
        <Input
          className={searchClass()}
          type="text"
          id="search"
          placeholder="Search"
          fullWidth={false}
          onChange={(event: any): void => {
            console.log(event);
            setSearch(event.target.value);
          }}
          value={search}
          name="search"
          onKeyPress={handleKeyPress}
        />
      </div>
      <Table
        head={
          <TableRow>
            <TableCell key="gym">Gym</TableCell>
            <TableCell key="location">Location</TableCell>
            <TableCell key="website">Website</TableCell>
          </TableRow>
        }
        body={gymsState.gyms.map((gym) => (
          <GymRow key={gym.id} gym={gym} />
        ))}
      />
    </React.Fragment>
  );
};

export default React.memo(GymsPage);

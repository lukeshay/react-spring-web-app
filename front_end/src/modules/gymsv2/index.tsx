import React from "react";
import { GymsStore } from "../../context/gyms/gymsStore";
import GymsPage from "./GymsPage";

const GymsIndex: React.FC = () => (
  <GymsStore>
    <GymsPage />
  </GymsStore>
);

export default GymsIndex;

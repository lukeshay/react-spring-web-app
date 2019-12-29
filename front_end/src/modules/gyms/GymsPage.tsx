import React, { useEffect, useState } from "react";
import * as GymsActions from "../../state/gyms/gymsActions";
import gymsStore from "../../state/gyms/gymsStore";
import { Gym } from "../../types/gym";

const GymsPage: React.FC = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);

  useEffect(() => {
    gymsStore.addChangeListener(handleGymsChange);

    if (gymsStore.getGyms().length === 0) {
      GymsActions.loadGyms();
    }

    return () => gymsStore.removeChangeListener(handleGymsChange);
  }, []);

  async function handleGymsChange(): Promise<void> {
    setGyms(gymsStore.getGyms());
  }

  return (
    <div>
      {gyms.map((gym) => (
        <div key={gym.id}>
          <h3>{gym.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default React.memo(GymsPage);

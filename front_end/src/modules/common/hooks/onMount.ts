import React from "react";

export const onMount = (callback: any): void => {
  React.useEffect(() => {
    callback();
  }, []);
};

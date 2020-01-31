/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

export const onMount = (callback: any): void => {
  React.useEffect(() => {
    callback();
  }, []);
};

import React from "react";

export interface IStoreCombinerProps {
  stores: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
}

const StoreCombiner: React.FunctionComponent<IStoreCombinerProps> = ({
  stores,
  children
}): JSX.Element => {
  return (
    <>
      {stores.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};

export default React.memo(StoreCombiner);

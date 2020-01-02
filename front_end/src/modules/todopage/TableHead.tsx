import * as React from "react";

export interface ITableHeadProps {
  children: React.ReactNode;
}

const TableHead: React.FunctionComponent<ITableHeadProps> = ({ children }) => {
  return (
    <thead>
      <tr className="table-secondary">{children}</tr>
    </thead>
  );
};

export default React.memo(TableHead);

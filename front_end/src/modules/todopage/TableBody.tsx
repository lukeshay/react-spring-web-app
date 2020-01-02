import * as React from "react";

export interface ITableBodyProps {
  children: React.ReactNode;
}

const TableBody: React.FunctionComponent<ITableBodyProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export default React.memo(TableBody);

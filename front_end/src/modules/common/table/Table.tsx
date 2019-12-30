import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";

export interface ITableProps {
  children: React.ReactNode;
}

const Table: React.FC<ITableProps> = ({ children }) => {
  return <table className="table">{children}</table>;
};

export default React.memo(Table);

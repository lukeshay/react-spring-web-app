import { Checkbox, FormControlLabel } from "@material-ui/core";
import * as React from "react";

export interface ICheckBoxProps {
  checked: boolean;
  className?: any;
  id: string;
  label: string;
  value: string;
  onChange?(event: any): Promise<void> | void;
}

const CheckBox: React.FunctionComponent<ICheckBoxProps> = ({
  checked,
  className,
  id,
  value,
  onChange,
  label
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox id={id} checked={checked} onChange={onChange} value={value} />
      }
      label={label}
      className={className}
    />
  );
};

export default CheckBox;

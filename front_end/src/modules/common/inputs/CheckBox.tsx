import { Checkbox, FormControlLabel } from "@material-ui/core";
import * as React from "react";

export interface ICheckBoxProps {
  checked: boolean;
  id: string;
  label: string;
  value: string;
  onChange?(event: any): Promise<void> | void;
}

const CheckBox: React.FunctionComponent<ICheckBoxProps> = ({
  checked,
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
    />
  );
};

export default CheckBox;

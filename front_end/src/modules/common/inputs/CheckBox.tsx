import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";

export interface ICheckBoxProps {
  checked: boolean;
  className?: any;
  id: string;
  label: string;
  value: string;
  color?: "primary" | "secondary" | "default";
  onChange?(event: any): Promise<void> | void;
}

const CheckBox: React.FunctionComponent<ICheckBoxProps> = ({
  checked,
  className,
  id,
  value,
  onChange,
  color,
  label
}): JSX.Element => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          checked={checked}
          onChange={onChange}
          value={value}
          color={color}
        />
      }
      label={label}
      className={className}
    />
  );
};

CheckBox.defaultProps = {
  color: "default"
};

export default CheckBox;

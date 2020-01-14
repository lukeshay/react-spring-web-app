import Button from "@material-ui/core/Button";
import React from "react";
import { IButtonProps } from "./IButtonProps";

const ButtonDefault: React.FC<IButtonProps> = ({
  id,
  type,
  variant,
  disabled,
  fullWidth,
  size,
  children,
  onClick,
  ...rest
}): JSX.Element => {
  return (
    <Button
      id={id}
      color="default"
      type={type}
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

ButtonDefault.defaultProps = {
  disabled: false,
  fullWidth: true,
  size: "medium",
  type: "button",
  variant: "contained"
};

export default ButtonDefault;

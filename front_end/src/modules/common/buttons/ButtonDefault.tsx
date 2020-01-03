import Button from "@material-ui/core/Button";
import * as React from "react";
import { IButtonProps } from "./IButtonProps";

const ButtonDefault: React.FC<IButtonProps> = ({
  id,
  type,
  variant,
  disabled,
  fullWidth,
  size,
  text,
  children,
  onClick
}) => {
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
    >
      {text}
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

export default React.memo(ButtonDefault);

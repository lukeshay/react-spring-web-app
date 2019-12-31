import Button from "@material-ui/core/Button";
import * as React from "react";
import { IButtonProps } from "./IButtonProps";

const ButtonPrimary: React.FC<IButtonProps> = ({
  id,
  type,
  variant,
  disabled,
  fullWidth,
  size,
  text,
  onClick
}) => {
  return (
    <Button
      id={id}
      color="primary"
      type={type}
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

ButtonPrimary.defaultProps = {
  disabled: false,
  fullWidth: true,
  size: "medium",
  type: "button",
  variant: "contained"
};

export default React.memo(ButtonPrimary);

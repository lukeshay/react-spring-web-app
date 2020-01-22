import Button from "@material-ui/core/Button";
import React from "react";

export interface IButtonProps {
  children?: React.ReactNode;
  color?: "default" | "primary" | "secondary";
  component?: React.ElementType;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  size?: "small" | "medium" | "large" | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
  onClick?(event: any): void | Promise<void>;
}

const ButtonDefault: React.FC<IButtonProps> = ({
  children,
  color,
  component,
  disabled,
  id,
  fullWidth,
  size,
  type,
  variant,
  onClick,
  ...rest
}): JSX.Element => {
  if (component) {
    return (
      <Button
        id={id}
        color={color}
        variant={variant}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        onClick={onClick}
        component={component}
        {...rest}
      >
        {children}
      </Button>
    );
  } else {
    return (
      <Button
        id={id}
        color={color}
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
  }
};

ButtonDefault.defaultProps = {
  color: "default",
  disabled: false,
  fullWidth: true,
  size: "medium",
  type: "button",
  variant: "contained"
};

export default ButtonDefault;

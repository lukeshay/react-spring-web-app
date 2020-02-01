import {
  createStyles,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  Theme
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    wrapperOne: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column"
    }
  })
);

export interface ISelectorProps {
  id: string;
  name: string;
  helperText?: string;
  label: string;
  value: string | number;
  children: React.ReactNode;
  native?: boolean;
  handleChange(event: any): Promise<void> | void;
}

const Selector: React.FC<ISelectorProps> = ({
  id,
  name,
  helperText,
  label,
  value,
  handleChange,
  native,
  children
}): JSX.Element => {
  const classes = useStyles();

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    if (inputLabel && inputLabel.current) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  }, []);

  return (
    <div className={classes.wrapperOne}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor={id}>
          {label}
        </InputLabel>
        <Select
          native={native}
          value={value}
          id={id}
          onChange={handleChange}
          labelWidth={labelWidth}
          inputProps={{
            id,
            name
          }}
        >
          {children}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};

Selector.defaultProps = {
  native: false
};

export default Selector;

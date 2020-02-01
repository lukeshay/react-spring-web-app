import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    uploadButtonWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "100%"
    }
  })
);

export interface IImageInputProps {
  accept: string;
  alt: string;
  children: React.ReactNode;
  imgClassName: string;
  id: string;
  multiple: boolean;
  src: string;
  onChange(event: any): void;
}

const ImageInput: React.FunctionComponent<IImageInputProps> = ({
  accept,
  alt,
  children,
  imgClassName,
  id,
  multiple,
  src,
  onChange
}): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <img src={src} alt={alt} className={imgClassName} />
      <div className={classes.uploadButtonWrapper}>
        <input
          accept={accept}
          id={id}
          multiple={multiple}
          type="file"
          onChange={onChange}
          style={{ display: "none" }}
        />
        <label htmlFor={id}>{children}</label>
      </div>
    </React.Fragment>
  );
};

export default ImageInput;

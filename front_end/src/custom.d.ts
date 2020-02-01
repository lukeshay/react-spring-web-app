/* eslint-disable @typescript-eslint/no-explicit-any */
// This gets rid of error when importing .svg files
declare module "*.svg" {
  const content: any;
  export default content;
}

// declare module "@material-ui/core" {
//   const content: any;
//   export default content;
// }

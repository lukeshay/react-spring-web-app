export function handleError(error: any): void {
  // tslint:disable-next-line:no-console
  console.error("API call failed. " + error);
  throw error;
}

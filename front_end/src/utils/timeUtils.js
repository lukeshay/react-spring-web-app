export function getOneDay() {
  return new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
}

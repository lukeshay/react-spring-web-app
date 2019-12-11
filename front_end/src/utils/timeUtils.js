export function getOneDay() {
  let d = new Date();
  d.setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
  return d;
}

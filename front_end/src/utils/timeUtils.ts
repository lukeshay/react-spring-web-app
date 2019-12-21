export function getOneDay(): Date {
  const d = new Date();
  d.setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
  return d;
}

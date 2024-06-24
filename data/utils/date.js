import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function getTodaysDate() {
  const today = dayjs();
  return today.format('YYYY-MM-DD HH:mm:ss');
}
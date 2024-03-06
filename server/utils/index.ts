import { zonedTimeToUtc } from "date-fns-tz";
import { format } from "date-fns";

export function getDateTime() {
  // 获取当前时间
  const currentDate = new Date();

  // 将当前时间转换为东八区的时间
  const timeZone = "Asia/Shanghai";
  const utcDate = zonedTimeToUtc(currentDate, timeZone);

  // 获取当前年月日
  const formattedDate = format(utcDate, "yyyyMMdd");

  return formattedDate;
}

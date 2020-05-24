export enum Time {
  ONE_MINUTE_IN_SECONDS = 60,
  ONE_HOUR_IN_SECONDS = Time.ONE_MINUTE_IN_SECONDS * 60,
}
export const ONE_MINUTE_IN_SECONDS = 60;
export const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 60;
export const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;

export const ONE_MINUTE_IN_MILLIS = 1000 * ONE_MINUTE_IN_SECONDS;
export const ONE_HOUR_IN_MILLIS = 1000 * ONE_HOUR_IN_SECONDS;
export const ONE_DAY_IN_MILLIS = 1000 * ONE_DAY_IN_SECONDS;

export class Dates {
  public static YYYY_DASH_MM_DASH_DD = "YYYY-MM-DD";
  public static YYYY_DASH_MM_DASH_DD_HH_MM_SS = "YYYY-MM-DD HH:mm:ss.sss";

  public static oneDayBefore(date: Date): Date {
    return new Date(date.getTime() - ONE_DAY_IN_MILLIS);
  }

  public static endOfDay(dateWithTime: Date): Date {
    const date = new Date(dateWithTime.getTime());
    date.setHours(23, 59, 59, 999);
    return date;
  }

  public static startOfDay(dateWithTime: Date): Date {
    const date = new Date(dateWithTime);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public static startOfHour(dateWithTime: Date): Date {
    const date = new Date(dateWithTime);
    date.setMinutes(0, 0, 0);
    return date;
  }

  public static dayRange(date1: Date, date2: Date): Date[] {
    const noTimeDate1 = Dates.endOfDay(date1);
    const noTimeDate2 = Dates.endOfDay(date2);
    const beginningDate = (noTimeDate1.getTime() > noTimeDate2.getTime()
      ? noTimeDate2
      : noTimeDate1
    ).getTime();
    const endDate = (noTimeDate1.getTime() < noTimeDate2.getTime()
      ? noTimeDate2
      : noTimeDate1
    ).getTime();

    let incrementingDate = beginningDate;
    let dates = [];
    while (incrementingDate <= endDate) {
      dates.push(Dates.endOfDay(new Date(incrementingDate)));
      incrementingDate = incrementingDate + ONE_DAY_IN_MILLIS;
    }
    return dates;
  }

  static hourRange(date1: Date, date2: Date) {
    const noTimeDate1 = Dates.startOfHour(date1);
    const noTimeDate2 = Dates.startOfHour(date2);

    const beginningDate = (noTimeDate1.getTime() > noTimeDate2.getTime()
      ? noTimeDate2
      : noTimeDate1
    ).getTime();
    const endDate = (noTimeDate1.getTime() < noTimeDate2.getTime()
      ? noTimeDate2
      : noTimeDate1
    ).getTime();

    let incrementingDate = beginningDate;
    let dates = [];
    while (incrementingDate <= endDate) {
      dates.push(new Date(incrementingDate));
      incrementingDate = incrementingDate + ONE_HOUR_IN_MILLIS;
    }
    return dates;
  }

  static addHours(date: Date, numberOfHours: number) {
    return new Date(date.getTime() + numberOfHours * ONE_HOUR_IN_MILLIS);
  }

  static addDays(date: Date, numberOfDays: number) {
    return new Date(date.getTime() + numberOfDays * ONE_DAY_IN_MILLIS);
  }

  static subtractDays(date: Date, numberOfDays: number) {
    return Dates.addDays(date, -numberOfDays);
  }

  static stripMillis(date: Date) {
    const dateWithoutMillis = new Date(date);
    dateWithoutMillis.setMilliseconds(0);
    return dateWithoutMillis;
  }
}

import moment from "moment";

export class DateUtils {

    public static toStringDatetime(date: Date | moment.Moment) {
        const _date = moment(date);
        return _date.format("YYYY-MM-DD[T]HH:mm:ss[Z]")
    }

}
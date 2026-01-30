import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
export function formatToWAT(date: string) {
  return dayjs
    .utc(date)
    .tz('Africa/Lagos')
    .format('ddd, DD MMM, HH:mm [WAT]')
    .toUpperCase()
}
export function formatToTime(dateString: string): string {
  return dayjs
    .utc(dateString)           // Parse as UTC
    .tz('Africa/Lagos')        // Convert to WAT timezone
    .format('HH:mm')           // Only hour:minute
}

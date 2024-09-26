import moment from "moment"

export const countPercentage = (current: string, maximum: string): string => {
  return `${(parseFloat(current) / parseFloat(maximum) * 100).toFixed(2)}%`
}

export const dateFormater = (val: string | Date): string => {
  return moment(val).format('MMM DD, YYYY h:mm A')
}

export const parseDate = (date) => {
  const time = new Date(date)
  return time.toString().slice(0, 3)
}

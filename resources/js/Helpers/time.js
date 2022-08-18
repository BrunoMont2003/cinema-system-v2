export function toHoursAndMinutes (totalMinutes) {
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  return `${padTo2Digits(hours)}h ${padTo2Digits(minutes)}min`
}

function padTo2Digits (num) {
  return num.toString().padStart(2, '0')
}

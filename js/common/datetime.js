
const dateInput = document.getElementById('date')
const timeSelect = document.getElementById('time')
const THIRTY_MIN = 30 * 60 * 1000;
const time = Math.ceil(new Date().getTime() / THIRTY_MIN) * THIRTY_MIN;
const now =  new Date(time + 9 * 60 * 60 * 1000)

const datetimeParts = now.toISOString().split('T')
dateInput.value = datetimeParts[0]
const timeParts = datetimeParts[1].split(':')
timeSelect.value = `${timeParts[0]}:${timeParts[1]}`

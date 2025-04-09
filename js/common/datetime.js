
const dateInput = document.getElementById('date')
const timeSelect = document.getElementById('time')
const now =  new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
dateInput.value = now.toISOString().split('T')[0]
timeSelect.value = now.toISOString().split('T')[1].split(':')[0] + ':00'

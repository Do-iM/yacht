import { insert } from '../common/supabase.js'
import { serviceItems, serviceTypes, users } from './build.js'
import { keyButtons } from '../common/buttons.js'

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const key = crypto.randomUUID();

const submit = document.getElementById('submit')

const dateInput = document.getElementById('date')
const timeSelect = document.getElementById('time')

submit.addEventListener('click', () => {
  insert('customers', users)
  insert('teams', {
    date: dateInput.value,
    time: timeSelect.value,
    service_item: keyButtons(serviceItems),
    service_type: keyButtons(serviceTypes),
    user_id: id,
    key: key,
  })
})









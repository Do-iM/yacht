import { insert } from '../common/supabase.js'
import * as Common from './build_common.js'
import { serviceItems, serviceTypes, users } from './build.js'
import { keyButtons } from '../common/buttons.js'

const confirmApply = document.getElementById('confirm-apply')

const dateInput = document.getElementById('date')
const timeSelect = document.getElementById('time')

confirmApply.addEventListener('click', () => {
  insert('customers', users)
  insert('teams', {
    date: dateInput.value,
    time: timeSelect.value,
    service_item: keyButtons(serviceItems),
    service_type: keyButtons(serviceTypes),
    user_id: Common.id,
    key: Common.key,
  })
})

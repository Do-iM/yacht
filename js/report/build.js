import { bindButtons, keyButtons, selectButtons } from '../common/buttons.js'
import { clearTable } from '../common/tables.js';
import { buildTemplate } from '../common/template.js'
import * as Common from './build_common.js'

export const serviceItems = {
    'BALI 4.3': document.getElementById('item1'),
    'BALI 4.0': document.getElementById('item2'),
}

bindButtons(serviceItems, (key) => {
    document.querySelectorAll('span.service-item').forEach(element => {
        element.textContent = key
    });
})

export const serviceTypes = {
    private: document.getElementById('btn-private'),
    public: document.getElementById('btn-public'),
}

bindButtons(serviceTypes, (key) => {
    document.querySelectorAll('span.service-type').forEach(element => {
        element.textContent = serviceTypes[key].textContent
    });
})

const editGenderButtons = {
    M: document.getElementById('edit-male'),
    F: document.getElementById('edit-female'),
}
bindButtons(editGenderButtons)


const nameInput = document.getElementById('name-input')
const birthInput = document.getElementById('birth-input');
const male = document.querySelector('#section4 button#male')
const female = document.querySelector('#section4 button#female')
const phoneInput = document.getElementById('phone-input');
const noPhoneCheckbox = document.getElementById('no-phone-checkbox');

const tbody = document.querySelector('#section5 tbody')

const popupA = document.getElementById('popupA')
const nameInputEdit = document.getElementById('edit-name-input')
const birthInputEdit = document.getElementById('edit-birth-input');
const phoneInputEdit = document.getElementById('edit-phone-input');

export let users = []
let popupUser

function userRow(user) {
    const name = document.createElement('td')
    name.textContent = user.name
    const birth = document.createElement('td')
    birth.textContent = user.birth
    const gender = document.createElement('td')
    gender.textContent = user.gender
    const phone = document.createElement('td')
    phone.textContent = user.phone
    const edit = document.createElement('td')
    const editButton = buildTemplate('b-edit')
    const deleteButton = buildTemplate('b-delete')
    editButton.addEventListener('click', () => {
        popupUser = user
        nameInputEdit.value = user.name
        birthInputEdit.value = user.birth
        selectButtons(editGenderButtons, user.gender)
        phoneInputEdit.value = user.phone
        popupA.hidden = false
    })
    deleteButton.addEventListener('click', () => {
        users = users.filter(item => item !== user)
        clearTable(tbody)
        users.forEach(item => {
            tbody.appendChild(userRow(item))
        })
    })

    edit.appendChild(editButton)
    edit.appendChild(deleteButton)
    const tr = document.createElement('tr')
    tr.appendChild(name)
    tr.appendChild(birth)
    tr.appendChild(gender)
    if (Common.usePhone()) tr.appendChild(phone)
    tr.appendChild(edit)
    return tr
}

function addUser(gender) {
    const user = {
        name: nameInput.value,
        birth: birthInput.value,
        gender: gender,
        phone: noPhoneCheckbox.checked ? '' : phoneInput.value,
        user_id: Common.id,
        key: Common.key,
    }

    nameInput.value = ''
    nameInput.dispatchEvent(new Event('input'));
    birthInput.value = ''
    birthInput.dispatchEvent(new Event('input'));
    phoneInput.value = ''
    noPhoneCheckbox.checked = false
    noPhoneCheckbox.dispatchEvent(new Event('input'));

    users.push(user)
    const tr = userRow(user)
    tbody.appendChild(tr)
}

male.addEventListener('click', () => {
    addUser('M')
});
female.addEventListener('click', () => {
    addUser('F')
});

const editCancel = document.getElementById('btn-edit-cancel')
const editApply = document.getElementById('btn-edit-apply')

editCancel.addEventListener('click', _ => {
    popupA.hidden = true
})

editApply.addEventListener('click', _ => {
    const user = popupUser

    user.name = nameInputEdit.value
    user.birth = birthInputEdit.value
    user.gender = keyButtons(editGenderButtons)
    user.phone = phoneInputEdit.value

    clearTable(tbody)
    users.forEach(item => {
        tbody.appendChild(userRow(item))
    })
    popupA.hidden = true
})


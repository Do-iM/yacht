
import * as Common from './build_common.js'

const sectionA = document.getElementById('sectionA')
const sectionB = document.getElementById('sectionB')
const sectionC = document.getElementById('sectionC')
const sectionD = document.getElementById('sectionD')
const section1 = document.getElementById('section1')
const section2 = document.getElementById('section2')
const section3 = document.getElementById('section3')
const section4 = document.getElementById('section4')
const section5 = document.getElementById('section5')

if (Common.id) {
    sectionA.hidden = false
    section1.hidden = false
}

const nextA = document.querySelector('#sectionA button.next')
const nextB = document.querySelector('#sectionB button.next')
const next1 = document.querySelector('#section1 button.next')
const next2 = document.querySelector('#section2 button.next')
const next3 = document.querySelector('#section3 button.next')
const male = document.getElementById('male')
const female = document.getElementById('female')
const add = document.getElementById('add')
const submit = document.getElementById('submit')

const backB = document.querySelector('#sectionB span.back')
const back1 = document.querySelector('#section1 span.back')
const back2 = document.querySelector('#section2 span.back')
const back3 = document.querySelector('#section3 span.back')
const back4 = document.querySelector('#section4 span.back')
const back5 = document.querySelector('#section5 span.back')


function move(a, b) {
    return () => {
        a.hidden = true
        b.hidden = false
    }
}

nextA.addEventListener('click', move(sectionA, sectionB))
nextB.addEventListener('click', move(sectionB, sectionC))
next1.addEventListener('click', move(section1, section2))
next2.addEventListener('click', _ => {
    if (Common.usePhone()) {
        move(section2, section3)()
    } else {
        move(section2, section4)()
    }
})
next3.addEventListener('click', move(section3, section4))
male.addEventListener('click', move(section4, section5))
female.addEventListener('click', move(section4, section5))
add.addEventListener('click', move(section5, section1))
submit.addEventListener('click', move(sectionC, sectionD))

backB.addEventListener('click', move(sectionB, sectionA))
back1.addEventListener('click', move(section1, section5))
back2.addEventListener('click', move(section2, section1))
back3.addEventListener('click', move(section3, section2))
back4.addEventListener('click', move(section4, section3))
back5.addEventListener('click', move(sectionC, sectionB))


const nameInput = document.getElementById('name-input')
nameInput.addEventListener('input', () => {
    next1.disabled = nameInput.value.trim().length == 0;
});

function isValidDate(yyyymmdd) {
    if (!/^\d{8}$/.test(yyyymmdd)) return false;
    const year = parseInt(yyyymmdd.slice(0, 4), 10);
    const month = parseInt(yyyymmdd.slice(4, 6), 10);
    const day = parseInt(yyyymmdd.slice(6, 8), 10);
    if (month < 1 || month > 12) return false;
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
}

const birthInput = document.getElementById('birth-input');
birthInput.addEventListener('input', () => {
    birthInput.value = birthInput.value.replace(/\D/g, '').slice(0, 8)
    
    if (birthInput.value.length == 8) {
        if (isValidDate(birthInput.value)) {
            birthInput.setCustomValidity("")
            next2.disabled = false
        } else {
            birthInput.setCustomValidity("올바른 생년월일을 입력해주세요")
            next2.disabled = true
        }
    } else {
        birthInput.setCustomValidity("")
        next2.disabled = true
    }
    birthInput.reportValidity();
});

function isValidPhone(phoneNumber) {
    if (!/^\d{11}$/.test(phoneNumber)) return false;
    return phoneNumber.startsWith("01");
}

const phoneInput = document.getElementById('phone-input');
const noPhoneCheckbox = document.getElementById('no-phone-checkbox');
phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 11)
    
    if (phoneInput.value.length == 11) {
        if (isValidPhone(phoneInput.value)) {
            phoneInput.setCustomValidity("")
            next3.disabled = false
        } else {
            phoneInput.setCustomValidity("올바른 전화번호를 입력해주세요")
            next3.disabled = true
        }
    } else {
        phoneInput.setCustomValidity("")
        next3.disabled = true
    }
    phoneInput.reportValidity();
});

noPhoneCheckbox.addEventListener('input', () => {
    if (noPhoneCheckbox.checked) {
        phoneInput.disabled = true
        next3.disabled = false
    } else {
        phoneInput.disabled = false
        phoneInput.dispatchEvent(new Event('input'));
    }
});

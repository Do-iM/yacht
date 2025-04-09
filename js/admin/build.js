import { user, supabase } from '../common/supabase.js'
import { buildRow } from '../common/tables.js'
import QRCode from 'https://cdn.jsdelivr.net/npm/qrcode@1.5.1/+esm';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

(async _ => {
    if ((await user()).id != id) {
        window.location.href = '/login'
    }
})()

const dateInput = document.getElementById('date')
const timeSelect = document.getElementById('time')
const table = document.getElementById('table')
const count = document.getElementById('count')

const koURL = document.getElementById('ko-url')
const koQR = document.getElementById('ko-qrcode')
const enURL = document.getElementById('en-url')
const enQR = document.getElementById('en-qrcode')

const koLink = `${window.location.origin}/report/?lang=ko&id=${id}`
const enLink = `${window.location.origin}/report/?lang=en&id=${id}`

koURL.textContent = koLink
enURL.textContent = enLink
QRCode.toDataURL(koLink).then(src => koQR.src = src)
QRCode.toDataURL(enLink).then(src => enQR.src = src)


async function query() {
    const { data: teams } = await supabase.from('teams').select().eq('date', dateInput.value).eq('time', timeSelect.value)
    const teamDict = Object.fromEntries(teams.map(item => [item.key, item]));
    const keys = teams.map(item => item.key)
    const { data: customers } = await supabase.from('customers').select().in('key', keys).order('id')

    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }

    customers.forEach((customer, i) => {
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox';
        const phone = customer.phone ? `${customer.phone.slice(0, 3)}-${customer.phone.slice(3, 7)}-${customer.phone.slice(7)}` : '-';
        const row = buildRow(checkbox, i+1, teamDict[customer.key].id, customer.id, customer.name, customer.gender, customer.birth, phone)
        table.appendChild(row)
    });

    count.textContent = customers.length
}

dateInput.addEventListener('input', query)
timeSelect.addEventListener('input', query)

query()

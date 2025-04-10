import { keyButtons, bindButtons, selectButtons } from '../common/buttons.js';
import { user, supabase } from '../common/supabase.js'
import { buildRow, clearTable } from '../common/tables.js'
import QRCode from 'https://cdn.jsdelivr.net/npm/qrcode@1.5.1/+esm';
import { buildTemplate } from '../common/template.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

(async _ => {
    if ((await user()).id != id) {
        window.location.href = '../login'
    }
})()

const dateInput = document.getElementById('date')
const timeSelect = document.getElementById('time')
const yachtSelect = document.getElementById('yacht')
const date1 = document.getElementById('date1')
const date2 = document.getElementById('date2')

const table1 = document.getElementById('table1')
const table2 = document.getElementById('table2')
const table3 = document.getElementById('table3')

const count = document.getElementById('count')

const printSection = document.getElementById('print-section')

const url = document.getElementById('url')
const qrcode = document.getElementById('qrcode')
const link = `${window.location.origin}/report/?id=${id}`
url.textContent = link
QRCode.toDataURL(link).then(src => qrcode.src = src)




export const tabs = {
    '1': document.getElementById('tab1'),
    '2': document.getElementById('tab2'),
    '3': document.getElementById('tab3'),
}



bindButtons(tabs, (key) => {
    dateInput.hidden = key == '3'
    timeSelect.hidden = key != '2'
    yachtSelect.hidden = key == '3'
    table1.parentElement.hidden = key != '1'
    table2.parentElement.hidden = key != '2'
    table3.parentElement.hidden = key != '3'
    date1.hidden = key != '3'
    date2.hidden = key != '3'
    printSection.hidden = key != '1'
    query()
})


const printYacht = document.getElementById('print-yacht')
const printTon = document.getElementById('print-ton')
const printCount = document.getElementById('print-count')
const printNames = document.getElementById('print-names')
const inputNames = document.getElementById('input-names')

const printTimesTable = document.getElementById('print-times')

inputNames.addEventListener('input', _ => {
    printNames.textContent = inputNames.value
})





function datestring(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based month
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}


const popup = document.getElementById('popup')
const nameInputEdit = document.getElementById('edit-name-input')
const birthInputEdit = document.getElementById('edit-birth-input');
const phoneInputEdit = document.getElementById('edit-phone-input');
const editGenderButtons = {
    M: document.getElementById('edit-male'),
    F: document.getElementById('edit-female'),
}
bindButtons(editGenderButtons)

let popupId

async function query() {
    const tab = keyButtons(tabs)
    if (tab == '1') {
        const yacht = yachtSelect.value
        const { data: teams } = await supabase.from('teams').select('key,time,service_item').eq('date', dateInput.value).eq('service_item', yacht).order('time', { ascending: true })
        
        const times = {}
        for (const item of teams) {
            const { count } = await supabase.from('customers').select('*', { count: 'exact', head: true }).eq('key', item.key)
            if (!times[item.time]) times[item.time] = 0
            times[item.time] += count
        }

        clearTable(table1)
        for (const key in times) {
            const reportButton = buildTemplate('b-report')
            reportButton.addEventListener('click', _ => {
                timeSelect.value = key
                selectButtons(tabs, '2')
            })
            const row = buildRow(`${dateInput.value} / ${key} / ${yacht}`, `${times[key]}명`, reportButton)
            table1.appendChild(row)
        }

        count.textContent = Object.keys(times).length

        /////
        printYacht.textContent = yachtSelect.value
        switch (yachtSelect.value) {
            case 'BALI 4.3':
                printTon.textContent = '17.0 ton'
                printCount.textContent = '40'
                break
            case 'BALI 4.0':
                printTon.textContent = '12.0 ton'
                printCount.textContent = '32'
                break
        }

        clearTable(printTimesTable)
        const keys = Object.keys(times)
        for (let i = 0; i < 20; i++) {
            let row
            if (i < keys.length) {
                const key = keys[i]
                const [hour, minute] = key.split(':').map(Number);
                const time2 = `${String(hour+1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                row = buildRow(`${dateInput.value} ${key}`, '수영만요트경기장', times[key], `${dateInput.value} ${time2}`, '수영만요트경기장', times[key], '김광민')
            } else {
                row = buildRow('', '', '', '', '', '', '')
            }
            printTimesTable.appendChild(row)
        }

    } else if (tab == '2') {
        const { data: teams } = await supabase.from('teams').select().eq('date', dateInput.value).eq('time', timeSelect.value)
        const teamDict = Object.fromEntries(teams.map(item => [item.key, item]));
        const keys = teams.map(item => item.key)
        const { data: customers } = await supabase.from('customers').select().in('key', keys).order('id')

        clearTable(table2)
        customers.forEach((customer, i) => {
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox';
            const phone = customer.phone ? `${customer.phone.slice(0, 3)}-${customer.phone.slice(3, 7)}-${customer.phone.slice(7)}` : '-';

            const buttons = document.createElement('div')
            const editButton = buildTemplate('b-edit')
            const deleteButton = buildTemplate('b-delete')
            buttons.appendChild(editButton)
            buttons.appendChild(deleteButton)

            editButton.addEventListener('click', _ => {
                popupId = customer.id
                nameInputEdit.value = customer.name
                birthInputEdit.value = customer.birth
                selectButtons(editGenderButtons, customer.gender)
                phoneInputEdit.value = customer.phone
                popup.hidden = false
            })
            deleteButton.addEventListener('click', async _ => {
                await supabase.from('customers').delete().eq('id', customer.id)
                query()
            })

            const row = buildRow(checkbox, i+1, teamDict[customer.key].id, customer.id, customer.name, customer.gender, customer.birth, phone, buttons)
            table2.appendChild(row)
        });

        count.textContent = customers.length
    } else {
        if (date1.value.length == 0 || date2.value.length == 0) {
            return
        }
    
        
        const { data: teams } = await supabase.from('teams').select().gte('date', date1.value).lte('date', date2.value)
        const teamDict = Object.fromEntries(teams.map(item => [item.key, item]));
        const keys = teams.map(item => item.key)
        const { data: customers } = await supabase.from('customers').select().in('key', keys).order('id').order('created_at')
    
        clearTable(table3)
        for (const r of customers) {
            const t = teamDict[r.key]
            const row = buildRow(t.date, t.time, t.service_item, t.service_type=='public' ? '퍼블릭' : '프라이빗', r.name, r.birth, r.gender=='M' ? '남' : '여', r.phone, datestring(new Date(r.created_at)))
            table3.appendChild(row)
        }
    }
}

dateInput.addEventListener('input', query)
timeSelect.addEventListener('input', query)
yachtSelect.addEventListener('input', query)
date1.addEventListener('input', query)
date2.addEventListener('input', query)

selectButtons(tabs, '1')


const all = document.getElementById('all')
all.addEventListener('input', _ => {
    document.querySelectorAll('tbody#table2 tr').forEach(row => {
        row.firstChild.firstChild.checked = all.checked
    })
})

const deleteSelected = document.getElementById('delete-selected')
deleteSelected.addEventListener('click', async _ => {
    const ids = []
    document.querySelectorAll('tbody#table2 tr').forEach(row => {
        if (row.firstChild.firstChild.checked) {
            ids.push(row.children.item(3).textContent)
        }
    })
    await supabase.from('customers').delete().in('id', ids)
    query()
})


const editCancel = document.getElementById('btn-edit-cancel')
const editApply = document.getElementById('btn-edit-apply')

editCancel.addEventListener('click', _ => {
    popup.hidden = true
})

editApply.addEventListener('click', async _ => {
    const {error} = await supabase.from('customers').update({
        name: nameInputEdit.value,
        birth: birthInputEdit.value,
        gender: keyButtons(editGenderButtons),
        phone: phoneInputEdit.value
    }).eq('id', popupId)
    console.log(error)

    popup.hidden = true
    query()
})


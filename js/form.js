import { supabase } from './supabaseClient.js'

// 버튼 요소
const btnPublic = document.getElementById('btn-PUBLIC')
const btnPrivate = document.getElementById('btn-PRIVATE')
const nextBtn = document.querySelector('#p1 button')
const submitBtn = document.querySelector('#p2 button')

// 섹션 요소
const p1 = document.getElementById('p1')
const p2 = document.getElementById('p2')

// 입력 요소
const nameInput = document.getElementById('name')
const dateInput = document.getElementById('date')
const timeSelect = document.getElementById('time')

// 결과 메시지 표시
const result = document.getElementById('result')

// 선택된 서비스 유형
let selectedType = 'PUBLIC'

// 서비스 버튼 클릭 시 스타일 전환
btnPublic.addEventListener('click', () => {
  selectedType = 'PUBLIC'
  btnPublic.className = 'primary'
  btnPrivate.className = 'secondary'
})

btnPrivate.addEventListener('click', () => {
  selectedType = 'PRIVATE'
  btnPrivate.className = 'primary'
  btnPublic.className = 'secondary'
})

// 날짜 기본값: 오늘
dateInput.value = new Date().toISOString().split('T')[0]

// "다음" 버튼 클릭 → p2 보이기
nextBtn.addEventListener('click', (e) => {
  e.preventDefault()

  if (!nameInput.value.trim()) {
    result.textContent = '이름을 입력해주세요.'
    result.style.color = 'red'
    return
  }

  result.textContent = ''
  p1.hidden = true
  p2.hidden = false
})

// "제출" 버튼 클릭 → Supabase에 전송
submitBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const name = nameInput.value.trim()
  const date = dateInput.value
  const time = timeSelect.value

  if (!name || !date || !time) {
    result.textContent = '모든 항목을 입력해주세요.'
    result.style.color = 'red'
    return
  }

  const { error } = await supabase.from('answers').insert([
    { type: selectedType, name, date, time }
  ])

  if (error) {
    result.textContent = '제출 실패: ' + error.message
    result.style.color = 'red'
  } else {
    result.textContent = '제출 완료! 감사합니다 😊'
    result.style.color = 'green'

    // 초기화
    p1.hidden = false
    p2.hidden = true
    nameInput.value = ''
    dateInput.value = new Date().toISOString().split('T')[0]
    timeSelect.selectedIndex = 0
    selectedType = 'PUBLIC'
    btnPublic.className = 'primary'
    btnPrivate.className = 'secondary'
  }
})

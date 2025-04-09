import { signin } from '../common/supabase.js'

const id = document.getElementById('id')
const password = document.getElementById('password')
const login = document.getElementById('login')
login.addEventListener('click', () => {
    signin(id.value, password.value)
})


import { setLang } from '../common/languages.js';
import { skipPhone } from './build_common.js';

//#region Languages
const popupB = document.getElementById('popupB')
const korean = document.getElementById('korean')
const english = document.getElementById('english')
const japanese = document.getElementById('japanese')
const chinese = document.getElementById('chinese')

function changeLang(lang) {
    return _ => {
        setLang(lang)
        popupB.hidden = true
        if (lang != 'ko') {
          skipPhone()
          document.querySelectorAll("[data-korean]").forEach(element => {
            element.hidden = true
          })
        }
    }
}

korean.addEventListener('click', changeLang('ko'))
english.addEventListener('click', changeLang('en'))
japanese.addEventListener('click', changeLang('ja'))
chinese.addEventListener('click', changeLang('zh'))
//#endregion

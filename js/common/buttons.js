
export function bindButtons(buttons, action) {
    for (const key in buttons) {
        const button = buttons[key]
        button.addEventListener('click', () => {
            Object.values(buttons).forEach(other => {
                if (button == other) {
                    other.classList.add('selected')
                } else {
                    other.classList.remove('selected')
                }
            })
            if (action) {
                action(key)
            }
        })
    }
}

export function keyButtons(buttons) {
    for (const key in buttons) {
        const button = buttons[key]
        if (button.classList.contains('selected')) {
            return key
        }
    }
}

export function selectButtons(buttons, key) {
    buttons[key].dispatchEvent(new Event('click'));
}

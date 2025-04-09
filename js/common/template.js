
const elements = {}
const templates = document.querySelectorAll('template')

templates.forEach(template => {
    const element = template.content.firstElementChild
    elements[template.id] = element
    document.querySelectorAll(template.id).forEach(tag => {
        tag.replaceWith(element.cloneNode(true))
    })
    templates.forEach(other => {
        other.content.querySelectorAll(template.id).forEach(tag => {
            tag.replaceWith(element.cloneNode(true))
        })
    })
})

export function buildTemplate(id) {
    return elements[id].cloneNode(true)
}

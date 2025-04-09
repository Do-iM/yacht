
export function clearTable(tbody) {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
}

export function buildRow(...items) {
    const tr = document.createElement('tr')
    items.forEach(item => {
        const td = document.createElement('td')
        if (typeof item === 'string' || typeof item === 'number') {
            td.textContent = item
        } else if (item instanceof Node) {
            td.appendChild(item);
        }
        tr.appendChild(td)
    });
    return tr
}

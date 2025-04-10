
const params = new URLSearchParams(window.location.search);
export const id = params.get('id');
export const key = crypto.randomUUID();

let phone = true;
export function skipPhone() {
    phone = false
}
export function usePhone() {
    return phone
}
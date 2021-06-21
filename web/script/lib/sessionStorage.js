const menuNameKey = 'menuName';
const queryKey = 'query';

export function getMenuName() {
    return sessionStorage.getItem(menuNameKey);
}

export function setMenuName(menuName) {
    sessionStorage.setItem(menuNameKey, menuName);
}

export function getQuery() {
    return JSON.parse(sessionStorage.getItem(queryKey));
}

export function setQuery(query) {
    sessionStorage.setItem(queryKey, JSON.stringify(query));
}
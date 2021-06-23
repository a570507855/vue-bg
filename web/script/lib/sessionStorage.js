const queryKey = 'query';
const menuRouteKey = 'currentMenuRoute';
const menuIndexKey = 'currentMenuIndex';

export function getQuery() {
    return JSON.parse(sessionStorage.getItem(queryKey));
}

export function setQuery(query) {
    sessionStorage.setItem(queryKey, JSON.stringify(query));
}

export function getCurrentMenuRoute() {
    return sessionStorage.getItem(menuRouteKey);
}

export function setCurrentMenuRoute(route) {
    sessionStorage.setItem(menuRouteKey, route);
}

export function getCurrentMenuIndex() {
    return sessionStorage.getItem(menuIndexKey);
}

export function setCurrentMenuIndex(index) {
    sessionStorage.setItem(menuIndexKey, index);
}
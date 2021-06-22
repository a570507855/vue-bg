const queryKey = 'query';

export function getQuery() {
    return JSON.parse(sessionStorage.getItem(queryKey));
}

export function setQuery(query) {
    sessionStorage.setItem(queryKey, JSON.stringify(query));
}
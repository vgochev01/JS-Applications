import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const host = api.settings.host;

export async function lastArticleByCat() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function getAllArticles() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}

export async function getArticleById(id){
    return await api.get(host + '/data/wiki/' + id);
}

export async function createArticle(data) {
    return await api.post(host + '/data/wiki', data);
}

export async function editArticle(id, data) {
    return await api.put(host + '/data/wiki/' + id, data);
}

export async function apiDeleteArticle(id) {
    return await api.del(host + '/data/wiki/' + id);
}

export async function articlesByTitle(match) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${match}%22`);
}

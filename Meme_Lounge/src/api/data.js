import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const host = api.settings.host;

export async function getMemes() {
    return await api.get(host + 'data/memes?sortBy=_createdOn%20desc');
}

export async function getMemeById(id) {
    return await api.get(host + 'data/memes/' + id);
}

export async function createMeme(data) {
    return await api.post(host + 'data/memes', data);
}

export async function editMeme(id, data){
    return await api.put(host + `data/memes/` + id, data);
}

export async function deleteMeme(id) {
    return await api.del(host + `data/memes/` + id);
}
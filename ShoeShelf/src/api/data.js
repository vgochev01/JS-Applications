import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const host = api.settings.host;

export async function getShoes() {
    return await api.get(host + '/data/shoes');
}

export async function getShoeById(id){
    return await api.get(host + '/data/shoes/' + id);
}

export async function getMyShoes(userId) {
    return await api.get(host + `/data/shoes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createShoe(data) {
    return await api.post(host + '/data/shoes', data);
}

export async function editShoe(id, data) {
    return await api.put(host + '/data/shoes/' + id, data);
}

export async function deleteShoe(id) {
    return await api.del(host + '/data/shoes/' + id);
}


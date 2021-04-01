import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const host = api.settings.host;

export async function getCars() {
    return await api.get(host + '/data/cars?sortBy=_createdOn%20desc');
}

export async function createCar(data) {
    return await api.post(host + '/data/cars', data);
}

export async function getCarById(id){
    return await api.get(host + '/data/cars/' + id);
}

export async function deleteCar(id) {
    return await api.del(host + '/data/cars/' + id);
}
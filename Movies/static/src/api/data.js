import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const host = api.settings.host;

export async function getMovies() {
    return await api.get(host + '/data/movies');
}

export async function getMovieById(id) {
    return await api.get(host + '/data/movies/' + id);
}

export async function createMovie(data) {
    return await api.post(host + '/data/movies', data);
}

export async function editMovie(id, data){
    return await api.put(host + '/data/movies/' + id, data);
}

export async function deleteMovie(id){
    return await api.del(host + '/data/movies/' + id);
}

export async function addLike(movieId){
    return await api.post(host + '/data/likes', {movieId});
}

export async function getLikes(id){
    return await api.get(host + `/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function checkUserLiked(id){
    const userId = sessionStorage.getItem('userId');
    const result = await api.get(host + `/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`); 
    return result.length > 0;
}
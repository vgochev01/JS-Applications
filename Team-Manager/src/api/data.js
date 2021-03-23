import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const host = api.settings.host;

export async function getTeams() {
    return await api.get(host + 'data/teams');
}

export async function getAllMembers() {
    return await api.get(host + 'data/members?where=status%3D%22member%22');
}

export async function createTeam(data) {
    return await api.post(host + 'data/teams', data);
}

export async function getTeamById(id) {
    return await api.get(host + 'data/teams/' + id);
}

export async function getTeamMembers(teamId){
    return await api.get(host + `data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`);
}

export async function joinTeam(teamId){
    return await api.post(host + `data/members`, {teamId});
}

export async function approveMember(id){
    return await api.put(host + `data/members/` + id, {status: 'member'});
}

export async function removeMember(id){
    return await api.del(host + `data/members/` + id);
}

export async function editTeam(id, data){
    return await api.put(host + `data/teams/` + id, data);
}

export async function getMyTeams(userId) {
    return await api.get(host + `data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`);
}
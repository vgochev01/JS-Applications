export const settings = {
    host: 'http://localhost:3030'
}

async function request(url, options = {}) {
    try {
        const response = await fetch(url, options);
        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

function createOptions(method = 'GET', data) {
    let options = {
        method,
        headers: {}
    }

    if(data){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const token = null //sessionStorage.getItem('authToken');
    if(token != null) {
        options.headers['X-Authorization'] = token;
    }
    
    return options;
}

export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, data) {
    return await request(url, createOptions('POST', data));
}

export async function put(url, data) {
    return await request(url, createOptions('PUT', data));
}

export async function del(url) {
    return await request(url, createOptions('DELETE'));
}

// AUTHENTICATION

export async function login(email, password) {
    const response = await post(settings.host + '/users/login', { email, password });
    sessionStorage.setItem('authToken', response.accessToken);
    sessionStorage.setItem('userId', response._id);
    sessionStorage.setItem('email', response.email);
}
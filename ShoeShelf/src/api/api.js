// set your rest service host
export const settings = {
    host: 'http://localhost:3030'
}

// Main request function
async function request(url, options = {}) {
    try {
        const response = await fetch(url, options);

        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }

    } catch (err) {
        console.error(err.message);
        throw err;
    }
}


// Create Options function
function createOptions(method = 'GET', data) {
    let options = {
        method,
        headers: {}
    }

    if(data){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const token = sessionStorage.getItem('authToken');
    if(token != null) {
        options.headers['X-Authorization'] = token;
    }
    
    return options;
}


// CRUD Functions
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

export async function login(username, password) {
    const result = await post(settings.host + '/users/login', { username, password });
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', result.username);
    return result;
}

export async function register(username, password) {
    const result = await post(settings.host + '/users/register', { username, password });
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', result.username);
    return result;
}

export async function logout() {
    await get(settings.host + '/users/logout');
    sessionStorage.clear(); //or remove them one by one
}
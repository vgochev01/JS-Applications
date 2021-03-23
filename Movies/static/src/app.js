import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';

import {logout} from '../src/api/data.js';

import { showMovies } from './views/home.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showAdd } from './views/create.js';

const main = document.querySelector('main');
const nav = document.querySelector('nav');

displayNav();

page('/home', decorateContext, showMovies);
page('/details/:id', decorateContext, showDetails);
page('/edit/:id', decorateContext, showEdit);
page('/login', decorateContext, showLogin);
page('/register', decorateContext, showRegister);
page('/create', decorateContext, showAdd);

page.redirect('/', '/home');
page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.displayNav = displayNav;

    next();
}

// if there is logged in user display Welcome/logout, if not display login/Register.
function displayNav(){
    const email = sessionStorage.getItem('email');
    if(email != null){
        document.getElementById('welcome-msg').textContent = 'Welcome, ' + email;
        Array.from(nav.querySelectorAll('.nav-item.user')).forEach((l) => l.style.display = 'block')
        Array.from(nav.querySelectorAll('.nav-item.guest')).forEach((l) => l.style.display = 'none')
    } else {
        Array.from(nav.querySelectorAll('.nav-item.user')).forEach((l) => l.style.display = 'none')
        Array.from(nav.querySelectorAll('.nav-item.guest')).forEach((l) => l.style.display = 'block')
    }
}

document.getElementById('logoutBtn').addEventListener('click', logoutHandler);

//logout and clear session
async function logoutHandler(){
    
    await logout();

    sessionStorage.clear();
    page.redirect('/home');
    displayNav();
}
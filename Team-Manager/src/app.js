import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs'

import { logout } from './api/data.js';
import { showBrowse } from './views/browse.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showMyTeams } from './views/my-teams.js';
import { showRegister } from './views/register.js';

const main = document.querySelector('main');

setUserNav();

page('/home', decorateContext, showHome);
page('/browse', decorateContext, showBrowse);
page('/details/:id', decorateContext, showDetails);
page('/login', decorateContext, showLogin);
page('/register', decorateContext, showRegister);
page('/create', decorateContext, showCreate);
page('/edit/:id', decorateContext, showEdit);
page('/my-teams', decorateContext, showMyTeams);

page.redirect('/', '/home');

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;

    next();
}

document.getElementById('logoutBtn').addEventListener('click', logoutClick)

function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        [...document.querySelectorAll('a.user')].forEach(a => a.style.display = 'block');
        [...document.querySelectorAll('a.guest')].forEach(a => a.style.display = 'none');
    } else {
        [...document.querySelectorAll('a.user')].forEach(a => a.style.display = 'none');
        [...document.querySelectorAll('a.guest')].forEach(a => a.style.display = 'block');
    }
}

function setActiveNav(navTarget, linkId) {
    [...navTarget.querySelectorAll('a')].forEach((a) => {
        if (a.id == linkId) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    })
}

async function logoutClick(ev) {
    ev.preventDefault();
    await logout();
    setUserNav();
    page.redirect('/home');
}
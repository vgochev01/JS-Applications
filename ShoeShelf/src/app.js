import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';

const main = document.getElementById("mainContent");
document.getElementById('logoutBtn').addEventListener('click', logoutHandler);

setUserNav();

page('/', decorateContext, showHome);
page('/details/:id', decorateContext, showDetails);
page('/edit/:id', decorateContext, showEdit);
page('/register', decorateContext, showRegister);
page('/login', decorateContext, showLogin);
page('/create', decorateContext, showCreate);
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const email = sessionStorage.getItem('email');
    if(email != null){
        document.querySelector('.user > span').textContent = "Welcome, " + email;
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = '');
    } else {
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = '');
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
    }
}

async function logoutHandler(){
    await logout();
    setUserNav();
    page.redirect('/');
}

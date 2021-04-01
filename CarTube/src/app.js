import { render } from '../node_modules/lit-html/lit-html.js';
import { showHome } from './views/home.js';
import page from '../node_modules/page/page.mjs';
import { showLogin } from './views/login.js';
import { logout } from './api/data.js';
import { showRegister } from './views/register.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showProfile } from './views/profile.js';

const main = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', logoutHandler);

setUserNav();

page('/', decorateContext, showHome);
page('/login', decorateContext, showLogin);
page('/register', decorateContext, showRegister);
page('/catalog', decorateContext, showCatalog);
page('/details/:id', decorateContext, showDetails);
page('/create', decorateContext, showCreate);
page('/edit/:id', decorateContext, showEdit);
page('/profile', decorateContext, showProfile);

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const username = sessionStorage.getItem('username');
    if(username != null) {
        document.querySelector('#profile > a').textContent = 'Welcome ' + username;
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

async function logoutHandler(ev) {
    ev.preventDefault();
    await logout();
    setUserNav();
    page.redirect('/');
}
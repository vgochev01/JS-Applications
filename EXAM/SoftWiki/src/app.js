import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { logout } from './api/data.js';
import { showHome } from './views/home.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';
import { showSearch } from './views/search.js';

const main = document.getElementById("main-content");
document.getElementById('logoutBtn').addEventListener('click', logoutHandler);

setUserNav();

page('/', decorateContext, showHome);
page('/catalog', decorateContext, showCatalog);
page('/details/:id', decorateContext, showDetails);
page('/edit/:id', decorateContext, showEdit);
page('/register', decorateContext, showRegister);
page('/login', decorateContext, showLogin);
page('/create', decorateContext, showCreate);
page('/search', decorateContext, showSearch);
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if(userId != null){
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user').style.display = 'inline';
    } else {
        document.querySelector('#guest').style.display = 'inline';
        document.querySelector('#user').style.display = 'none';
    }
}

async function logoutHandler(){
    await logout();
    setUserNav();
    page.redirect('/');
}

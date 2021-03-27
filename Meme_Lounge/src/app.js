import page from '/node_modules/page/page.mjs';
import { render } from '/node_modules/lit-html/lit-html.js';

import {logout} from './api/data.js';

import { showHome } from '/src/views/home.js';
import { showMemes } from '/src/views/memes.js';
import { showProfile } from '/src/views/profile.js';
import { showDetails } from '/src/views/details.js';
import { showEdit } from '/src/views/edit.js';
import { showLogin } from '/src/views/login.js';
import { showRegister } from '/src/views/register.js';
import { showCreate } from '/src/views/create.js';

const main = document.querySelector('main');
const nav = document.querySelector('nav');

setUserNav();

page('/', decorateContext, showHome);
page('/memes', decorateContext, showMemes);
page('/profile', decorateContext, showProfile);
page('/details/:id', decorateContext, showDetails);
page('/edit/:id', decorateContext, showEdit);
page('/login', decorateContext, showLogin);
page('/register', decorateContext, showRegister);
page('/create', decorateContext, showCreate);

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;

    next();
}

// if there is logged in user display Welcome/logout, if not display login/Register.
function setUserNav(){
    const email = sessionStorage.getItem('email');
    if(email != null){
        document.querySelector('.profile span').textContent = 'Welcome, ' + email;
        nav.querySelector('.user').style.display = 'inline';
        nav.querySelector('.guest').style.display = 'none';
    } else {
        nav.querySelector('.user').style.display = 'none';
        nav.querySelector('.guest').style.display = 'inline';
    }
}

document.getElementById('logoutBtn').addEventListener('click', logoutHandler);

//logout and clear session
async function logoutHandler(){
    
    await logout();

    sessionStorage.clear();
    page.redirect('/');
    setUserNav();
}
import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { showHome } from './views/home.js';

const main = document.getElementById("mainContent");

setUserNav();

page('/', decorateContext, showHome);

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
    // await logout();
    page.redirect('/');
}

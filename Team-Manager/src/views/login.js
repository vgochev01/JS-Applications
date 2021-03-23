import {login} from '../api/data.js';
import {html} from '../../node_modules/lit-html/lit-html.js';

const loginTemplate = (onSubmit, errorMsg) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
            ${ errorMsg ? html`<div class="error">${errorMsg}</div>` : '' }
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>
`;

export function showLogin(ctx) {
    const authToken = sessionStorage.getItem('authToken');
    //check if user is already logged in
    if(authToken != null){
        return ctx.page.redirect('/home');
    }

    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email');
        const password = formData.get('password');
    
        if(email == '' || password == ''){
            return ctx.render(loginTemplate(onSubmit, 'All fields are necessary!'));
        }
        
        try {
            await login(email, password);
            ctx.setUserNav();
            ctx.page.redirect('/home');
        } catch (err) {
            return ctx.render(loginTemplate(onSubmit, err.message));
        }

    }
}
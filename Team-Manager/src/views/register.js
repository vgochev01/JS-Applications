import {register} from '../api/data.js';
import {html} from '../../node_modules/lit-html/lit-html.js';

const registerTemplate = (onSubmit, errorMsg) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
        ${ errorMsg ? html`<div class="error">${errorMsg}</div>` : '' }
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>
`;

export function showRegister(ctx) {
    const authToken = sessionStorage.getItem('authToken');
    //check if user is already logged in
    if(authToken != null){
        return ctx.page.redirect('/home');
    }

    ctx.render(registerTemplate(onSubmit));
    
    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const rePass = formData.get('repass');
        
        if(email == '' || username == '' || password == ''){
            return ctx.render(registerTemplate(onSubmit, 'All fields are necessary!'));
        } else if(password != rePass) {
            return ctx.render(registerTemplate(onSubmit, 'Passwords must match!'));
        }
    
        try {
            await register(email, username, password);
            ctx.setUserNav();
            ctx.page.redirect('/home');
        } catch (err) {
            return ctx.render(registerTemplate(onSubmit, err.message));
        }
    }
}
import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

const loginTemplate = (onSubmit) => html`
<h1>Login</h1>
<p class="form-info">Don't have account?
    <a href="/register">Register now</a> and fix that!
</p>
<form @submit=${onSubmit}>
    <div>
        <input type="email" name="email" placeholder="Email...">
    </div>

    <div>
        <input type="password" name="password" placeholder="Password...">
    </div>
    <div> 
        <button>Login</button>
    </div>
</form>
`;

export async function showLogin(ctx) {

    ctx.render(loginTemplate(onSubmit));
    
    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if([...formData.entries()].some(([k,v]) => v == '')){
            return alert("All fields are required!");
        }

        await login(email, password);
        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}
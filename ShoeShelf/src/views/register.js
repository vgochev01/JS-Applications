import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

const registerTemplate = (onSubmit) => html`
<h1>Register</h1>
<p class="form-info">Already registered?
    <a href="/login">Login now</a> and have some fun!
</p>

<form @submit=${onSubmit} action="">
    <div>
        <input type="text" name="email" placeholder="Email...">
    </div>
    <div>
        <input type="password" name="password" placeholder="Password">
    </div>
    <div>
        <input type="password" name="repass" placeholder="Re-password">
    </div>
    <div>
        <p class="message"></p>
        <button>Register</button>
    </div>
</form>
`;

export async function showRegister(ctx) {

    ctx.render(registerTemplate(onSubmit));
    
    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('repass');

        if([...formData.entries()].some(([k,v]) => v == '')){
            return alert("All fields are required!");
        }

        if(password != repass){
            return alert("Passwords must match!");
        }

        await register(email, password);
        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}
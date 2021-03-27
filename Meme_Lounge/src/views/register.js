import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

const registerTemplate = (onSubmit, errMsg) => html`
<section id="register">
    <form @submit=${onSubmit} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`;

export async function showRegister(ctx) {
    const authToken = sessionStorage.getItem('authToken');
    if(authToken == null){
        ctx.render(registerTemplate(onSubmit));
    } else {
        ctx.page.redirect('/memes');
    }

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('repeatPass');
        const gender = formData.get('gender');

        const entries = [...formData.entries()]
        if(entries.some(([k, v]) => v == '')){
            return alert('All fields are required!');
        } 

        if(password != repass){
            return alert('Passwords must match!');
        }

        await register(username, email, password, gender);
        ev.target.reset();
        ctx.page.redirect('/memes');
        ctx.setUserNav();
    }
}
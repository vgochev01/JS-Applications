import {login} from '../api/data.js';
import {html} from '../../../node_modules/lit-html/lit-html.js';

const loginTemplate = (onSubmit, errMsg) => html`
<section id="form-login">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
        ${errMsg ? html`<p class="err-msg">${errMsg}</p>` : '' }
        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</section>
`;

export async function showLogin(ctx){
   
    updateView();

    async function onSubmit(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');

        try {
            if(email == '' || password == ''){
                throw new Error('All fields are required!');
            } else {
                await login(email, password);
                ctx.page.redirect('/home');
                ctx.displayNav();
            }
        } catch (err) {
            updateView(err.message);
        }
    }

    function updateView(errMsg) {
        ctx.render(loginTemplate(onSubmit, errMsg));
    }
}
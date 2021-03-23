import {register} from '../api/data.js';
import {html} from '../../../node_modules/lit-html/lit-html.js';

const registerTemplate = (onSubmit, errMsg) => html`
<section id="form-sign-up">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
    ${errMsg ? html`<p class="err-msg">${errMsg}</p>` : '' }
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</section>
`;

export async function showRegister(ctx){
   
    updateView();

    async function onSubmit(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repass = formData.get('repeatPassword');

        try {
            if(email == '' || password == ''){
                throw new Error('All fields are required!');
            } else if(password != repass){ 
                throw new Error('Passwords must match!');
            } else {
                await register(email, password);
                ctx.page.redirect('/home');
                ctx.displayNav();
            }
        } catch (err) {
            updateView(err.message);
        }
    }

    function updateView(errMsg) {
        ctx.render(registerTemplate(onSubmit, errMsg));
    }
}
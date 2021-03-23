import {html} from '../../node_modules/lit-html/lit-html.js';
import {createTeam, joinTeam, approveMember} from '../api/data.js';

const createTemplate = (onSubmit, errMsg) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
        ${ errMsg ? html`<div class="error">${errMsg}</div>` : '' }
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>
`;

export async function showCreate(ctx){
    const authToken = sessionStorage.getItem('authToken');
    //check if the user is cheating using the URL
    if(authToken == null){
        return ctx.page.redirect('/home');
    }

    ctx.render(createTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const name = formData.get('name');
        const logoUrl = formData.get('logoUrl');
        const description = formData.get('description');
    
        if(name.length < 4){
            return ctx.render(createTemplate(onSubmit, 'Name must be at least 4 characters!'));
        } else if(logoUrl == '') {
            return ctx.render(createTemplate(onSubmit, 'Logo URL is a must!'));
        } else if(description.length < 10){
            return ctx.render(createTemplate(onSubmit, 'Description must be at least 10 characters!'));
        }

        const response = await createTeam({name, logoUrl, description});
        const joined = await joinTeam(response._id);
        await approveMember(joined._id);
        ctx.page.redirect('/details/' + response._id);
    }
}
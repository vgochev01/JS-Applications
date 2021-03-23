import {html} from '../../node_modules/lit-html/lit-html.js';
import {editTeam, getTeamById} from '../api/data.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import {loaderTemplate} from './loaderTemplate.js';

const editTemplate = (team, onSubmit, errMsg) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
        ${ errMsg ? html`<div class="error">${errMsg}</div>` : '' }
            <label>Team name: <input type="text" name="name" .value=${team.name}></label>
            <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
            <label>Description: <textarea name="description" .value=${team.description}></textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
</section>
`;

export async function showEdit(ctx){
    const authToken = sessionStorage.getItem('authToken');
    //check if the user is cheating using the URL
    if(authToken == null){
        return ctx.page.redirect('/home');
    }
    
    ctx.render(until(populateTemplate(), loaderTemplate()));
    
    async function populateTemplate(){
        const id = ctx.params.id;
        const team = await getTeamById(id);
        return editTemplate(team, onSubmit);

        async function onSubmit(ev) {
            ev.preventDefault();
            const formData = new FormData(ev.target);
            const name = formData.get('name');
            const logoUrl = formData.get('logoUrl');
            const description = formData.get('description');
        
            if(name.length < 4){
                return ctx.render(editTemplate(team, onSubmit, 'Name must be at least 4 characters!'));
            } else if(logoUrl == '') {
                return ctx.render(editTemplate(team, onSubmit, 'Logo URL is a must!'));
            } else if(description.length < 10){
                return ctx.render(editTemplate(team, onSubmit, 'Description must be at least 10 characters!'));
            }
    
            const response = await editTeam(id, {name, logoUrl, description});
            ctx.page.redirect('/details/' + id);
        }
    }
}
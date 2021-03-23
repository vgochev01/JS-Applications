import { html } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import { getAllMembers, getTeams } from '../api/data.js';
import {loaderTemplate} from './loaderTemplate.js';

const browseTemplate = (teams, isLogged) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>
    ${ isLogged ? 
    html`<article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>` :  ''  }

    ${teams.map(teamTemplate)}

</section>
`;

const teamTemplate = (team) => html`
<article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${team.members.length} Members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>
`;

export async function showBrowse(ctx) {
    const token = sessionStorage.getItem('authToken');

    ctx.render(until(populateTemplate(), loaderTemplate()))

    async function populateTemplate(){
        const teams = await getTeams();
        const allMembers = await getAllMembers();
        teams.forEach(team => {
            team.members = allMembers.filter(m => m.teamId == team._id);
        })
        return browseTemplate(teams, token != null);
    }
}
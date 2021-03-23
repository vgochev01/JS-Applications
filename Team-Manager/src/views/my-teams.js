import { html } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import { getAllMembers, getMyTeams, getTeams } from '../api/data.js';
import {loaderTemplate} from './loaderTemplate.js';

const myTeamsTemplate = (teams) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>
    ${teams.length == 0 ? html`
    <article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>` : ''}

    ${teams.map(t => teamTemplate(t.team))}

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

export async function showMyTeams(ctx) {
    const userId = sessionStorage.getItem('userId');

    ctx.render(until(populateTemplate(), loaderTemplate()))

    async function populateTemplate(){
        const teams = await getMyTeams(userId);
        const allMembers = await getAllMembers();
        teams.forEach(t => {
            t.team.members = allMembers.filter(m => m.teamId == t.team._id);
        })
        return myTeamsTemplate(teams);
    }
}
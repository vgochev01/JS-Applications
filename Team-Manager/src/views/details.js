import { html } from '../../node_modules/lit-html/lit-html.js';
import { approveMember, getTeamById, getTeamMembers, joinTeam, removeMember } from '../api/data.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import {loaderTemplate} from './loaderTemplate.js';

const userId = sessionStorage.getItem('userId');

const detailsTemplate = (team, members, info) => html`
<section id="team-home">
    <article class="layout">
        <img src=${team.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${members[0].length} Members</span>
            <div>
                ${controlsTemplate(team, info)}
            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
            ${members[0].map(m => html`<li>${m.user.username}${info.isOwner && team._ownerId != m._ownerId ? html`<a @click=${async (ev) => {ev.preventDefault(); await removeMember(m._id); info.renderDetails()}} href="javascript:void(0)" class="tm-control action">Remove from team</a>` : '' }</li>`)}
            </ul>
        </div>
        <div class="pad-large">
            <h3>Membership Requests</h3>
            <ul class="tm-members">
            ${members[1].map(m => html`<li>${m.user.username}${info.isOwner ? html`<a @click=${async (ev) => {ev.preventDefault(); await approveMember(m._id); info.renderDetails()}} href="javascript:void(0)" class="tm-control action">Approve</a><a @click=${async (ev) => {ev.preventDefault(); await removeMember(m._id); info.renderDetails()}} href="javascript:void(0)" class="tm-control action">Decline</a>` : '' }</li>`)}
            </ul>
        </div>
    </article>
</section>
`;

const controlsTemplate = (team, info) => html`
    ${info.isOwner ?
        html`<a href="/edit/${team._id}" class="action">Edit team</a>`
    : ''}

    ${info.isLogged && !info.isOwner && !info.hasJoined && !info.isPending ?
        html`<a @click=${async (ev) => {ev.preventDefault(); await joinTeam(team._id); info.renderDetails()}} href="javascript:void(0)" class="action">Join team</a>`
    : ''}

    ${info.hasJoined && !info.isOwner?
        html`<a @click=${async (ev) => {ev.preventDefault(); await removeMember(info.curMember._id); info.renderDetails()}} href="javascript:void(0)" class="action invert">Leave team</a>`
    : ''}

    ${info.isPending ?
        html`Membership pending. <a @click=${async (ev) => {ev.preventDefault(); await removeMember(info.curMember._id); info.renderDetails()}} href="javascript:void(0)">Cancel request</a>`
    : ''}
`;

export async function showDetails(ctx){
    const id = ctx.params.id;
    const userId = sessionStorage.getItem('userId');
    
    renderDetails();

    function renderDetails(){
        ctx.render(until(populateTemplate(), loaderTemplate()))
    }

    async function populateTemplate(){
        const details = await getTeamById(id);
        const teamMembers = await getTeamMembers(id);
        const members = teamMembers.filter(m => m.status == 'member');
        const pending = teamMembers.filter(m => m.status == 'pending');
        
        const isOwner = details._ownerId == userId;
        const isLogged = userId != null;
        const hasJoined = members.some(m => m._ownerId == userId);
        const isPending = pending.some(m => m._ownerId == userId);
        const curMember = teamMembers.find(m => m._ownerId == userId) || {user: {}};
        
        const info = {
            isOwner, isLogged, hasJoined, isPending, curMember, renderDetails
        }

        return detailsTemplate(details, [members, pending], info);

    }
    
}
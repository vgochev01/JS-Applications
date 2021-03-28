import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyMemes, getCount } from '../api/data.js';

const memeTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>
`;

const profileTemplate = (memes, info, pageInfo) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${info.gender}.png">
        <div class="user-content">
            <p>Username: ${info.username}</p>
            <p>Email: ${info.email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="pagination">
        <h4>Page ${pageInfo.page} of ${pageInfo.pagesCount}</h4>
        ${pageInfo.page > 1 ? html`
            <a @click=${() => pageInfo.prevPage()} href="/profile?page=${Number(pageInfo.page)-1}" id="pageBtn">Prev</a>
        ` : '' }

        ${pageInfo.page < pageInfo.pagesCount ? html`
            <a @click=${() => pageInfo.nextPage()} href="/profile?page=${Number(pageInfo.page)+1}" id="pageBtn">Next</a>
        ` : ''}
    </div>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) --> 
        ${ memes.length > 0 ? 
            memes.map(memeTemplate)
         : html`
            <!-- Display : If there are no memes in database -->
            <p class="no-memes">No memes in database.</p>
        ` }
    </div>
</section>
`;

export async function showProfile(ctx) {
    const userId = sessionStorage.getItem('userId');
    const info = {
        userId,
        email: sessionStorage.getItem('email'),
        username: sessionStorage.getItem('username'),
        gender: sessionStorage.getItem('gender')
    }

    const memesCount = await getCount(userId);

    const pageInfo = {
        page: 1,
        pagesCount: Math.ceil(memesCount / 3),
        async nextPage() {
            this.page++;
        },
        async prevPage() {
            this.page--;
        }
    }

    const querystring = ctx.querystring.split('=');
    if(querystring && querystring[0] == 'page'){
        const page = querystring[1]
        pageInfo.page = page;
    }

    await updateView()

    async function updateView(){
        const memes = await getMyMemes(userId, pageInfo.page);
        ctx.render(profileTemplate(memes, info, pageInfo));
    }
}
import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyMemes } from '../api/data.js';

const memeTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>
`;

const profileTemplate = (memes, info) => html`
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
    const memes = await getMyMemes(userId);

    const info = {
        userId,
        email: sessionStorage.getItem('email'),
        username: sessionStorage.getItem('username'),
        gender: sessionStorage.getItem('gender')
    }

    console.log(info);


    ctx.render(profileTemplate(memes, info));
}